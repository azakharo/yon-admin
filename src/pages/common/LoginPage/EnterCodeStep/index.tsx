import {FormEvent, useState} from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {
  enterPhone,
  enterSmsCode,
  getUrlToGoAfterLoginFromLocalStorage,
  remUrlToGoAfterLoginFromLocalStorage,
  useAuth,
} from '@features/auth';
import {yupResolver} from '@hookform/resolvers/yup';
import {Alert, Box, Button, FormHelperText, Typography} from '@mui/material';
import useCountDown from 'ahooks/es/useCountDown';
import useMount from 'ahooks/es/useMount';
import useRequest from 'ahooks/es/useRequest';
import useUpdateEffect from 'ahooks/es/useUpdateEffect';
import {MuiOtpInput} from 'mui-one-time-password-input';
import {object} from 'yup';

import {ROUTE__DASHBOARD} from '@shared/constants';
import {stringDefinedButCanBeEmpty} from '@shared/utils';
import {Header} from '@widgets/common';
import {useAuthData} from '../AuthDataContext';
import {StepPageLayout} from '../components/StepPageLayout';

import {COLOR__GRAY} from '@/theme/colors';

const inputProps = {
  // The following shows numeric keyboard, but doesn't show up/down arrow as type=number does
  type: 'tel',
  autoComplete: 'one-time-code',
} as const;

const v8nSchema = object().shape({
  code: stringDefinedButCanBeEmpty,
});

const CODE_LENGTH = 4;

// A function that validates each character during keyPress / paste events.
// If a user fills in an invalid character (like a letter instead of a number),
// it will not be displayed.
const validateChar = (text: string): boolean => {
  if (!text) {
    return true;
  }

  if (text.length > 1) {
    return false;
  }

  return !Number.isNaN(Number(text));
};

export const EnterCodeStep = () => {
  const navigate = useNavigate();
  const {onLoginSuccess} = useAuth();

  const {tokenToEnterSmsCode, phone, setTokenToEnterSmsCode, countryCode} =
    useAuthData();

  const {control, handleSubmit, setError, formState} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      code: '',
    },
  });
  const {isValid, isValidating} = formState;

  const currentCode = useWatch({control, name: 'code'});

  /////////////////////////////////////////////////////////
  // Send SMS retry

  const [countDownTargetDate, setCountDownTargetDate] = useState<number>();

  const startCountDown = () => {
    setCountDownTargetDate(Date.now() + 60_000);
  };

  const [countdown] = useCountDown({
    targetDate: countDownTargetDate,
  });

  useMount(() => {
    startCountDown();
  });

  const {
    loading: isSendingPhone,
    run: sendPhone,
    error: errorSendingPhone,
  } = useRequest(enterPhone, {
    manual: true,
    onSuccess: token => {
      setTokenToEnterSmsCode(token);
      startCountDown();
    },
    onError: () => {
      startCountDown();
    },
  });

  const resendSmsCode = () => {
    sendPhone(phone, countryCode);
  };

  // Send SMS retry
  /////////////////////////////////////////////////////////

  const {loading: isSendingCode, run: sendCode} = useRequest(enterSmsCode, {
    manual: true,
    onSuccess: tokens => {
      void onLoginSuccess(tokens).then(() => {
        navigate(getUrlToGoAfterLoginFromLocalStorage() || ROUTE__DASHBOARD);
        remUrlToGoAfterLoginFromLocalStorage();
        return;
      });
    },
    onError: () => {
      setError('code', {
        type: 'custom',
        message: 'Incorrect SMS code. Try again or request a new code.',
      });
    },
  });

  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    const theReturnedFunc = handleSubmit(values => {
      sendCode(values.code, tokenToEnterSmsCode);
    });

    void theReturnedFunc(event);
  };

  useUpdateEffect(() => {
    if (currentCode.length === CODE_LENGTH && isValid && !isValidating) {
      onSubmit();
    }
  }, [currentCode, isValid, isValidating]);

  return (
    <StepPageLayout px={2}>
      <Header title="Code" pt={1} ml={-1.3} />

      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 32,
        }}
        mt={4}
      >
        Code
      </Typography>

      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 15,
          color: COLOR__GRAY,
        }}
        mt={2}
      >
        {`SMS code has been sent to ${phone}`}
      </Typography>

      <form onSubmit={onSubmit} noValidate style={{display: 'contents'}}>
        <Controller
          name="code"
          control={control}
          render={({field, fieldState}) => (
            <Box>
              <MuiOtpInput
                {...field}
                gap={2}
                length={CODE_LENGTH}
                autoFocus
                TextFieldsProps={{
                  error: !!fieldState.error,
                  inputProps,
                }}
                sx={{
                  marginTop: 4.5,
                  '& .MuiOtpInput-TextField': {
                    width: 48,
                  },
                }}
                validateChar={validateChar}
              />
              {fieldState.invalid ? (
                <FormHelperText error>
                  {fieldState.error?.message}
                </FormHelperText>
              ) : null}
            </Box>
          )}
        />

        {!!countdown && (
          <Typography
            align="left"
            display="block"
            sx={{
              color: COLOR__GRAY,
              fontSize: 16,
              fontWeight: 500,
              whiteSpace: 'pre-line',
            }}
            mt={4.5}
          >
            {`You can request a new SMS\ncode in ${Math.round(countdown / 1000)
              .toString()
              .padStart(2, '0')} seconds.`}
          </Typography>
        )}

        {countdown === 0 && (
          <Button
            variant="text"
            sx={{
              marginTop: 3.5,
              padding: 1,
              justifyContent: 'flex-start',
              marginLeft: -1,
              width: 'fit-content',
            }}
            onClick={resendSmsCode}
            loading={isSendingPhone}
          >
            <Typography
              color="primary"
              sx={{
                fontSize: 16,
                fontWeight: 500,
                visibility: isSendingPhone ? 'hidden' : undefined,
              }}
            >
              New SMS code
            </Typography>
          </Button>
        )}

        <Button
          type={'submit'}
          color={'primary'}
          loading={isSendingCode}
          sx={{marginTop: 2}}
          disabled={currentCode.length < CODE_LENGTH}
        >
          Verify
        </Button>

        {errorSendingPhone && (
          <Box mt={4}>
            <Alert severity="error">{errorSendingPhone.message}</Alert>
          </Box>
        )}
      </form>
    </StepPageLayout>
  );
};

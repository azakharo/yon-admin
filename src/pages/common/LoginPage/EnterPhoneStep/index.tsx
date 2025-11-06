import {useState} from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {enterPhone} from '@features/auth';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Stack, Typography} from '@mui/material';
import useRequest from 'ahooks/es/useRequest';
import {matchIsValidTel, MuiTelInput, MuiTelInputCountry} from 'mui-tel-input';
import {object} from 'yup';

import {CountryFlag} from '@shared/components';
import {ROUTE__LOGIN__ENTER_CODE} from '@shared/constants';
import {stringDefinedButCanBeEmpty} from '@shared/utils';
import {useAuthData} from '../AuthDataContext';
import {StepPageLayout} from '../components/StepPageLayout';
import imageSrc from './image.jpg';

import {COLOR__LINE, COLOR__WHITE} from '@/theme/colors';

const USA = 'US';
const browserLanguage = navigator.language;

// For development add Russia. It's necessary for login via MRM
const supportedCountries: MuiTelInputCountry[] = [
  'BR',
  'MX',
  'PH',
  // TODO rem RU from the list of supported countries
  'RU',
  USA,
];

const v8nSchema = object().shape({
  phone: stringDefinedButCanBeEmpty,
});

const get2DigitIsoCountryCode = (
  currentLanguage: string,
): MuiTelInputCountry => {
  const langParts = currentLanguage.split('-');

  let country2DigitCode: string;
  // eslint-disable-next-line unicorn/prefer-ternary
  if (Array.isArray(langParts) && langParts.length === 2) {
    country2DigitCode = langParts[1]!;
  } else {
    country2DigitCode = currentLanguage.slice(0, 2);
  }

  return country2DigitCode.toUpperCase() as MuiTelInputCountry;
};

const getDefaultCountry = (currentLanguage: string): MuiTelInputCountry => {
  const countryDeterminedByCurLang = get2DigitIsoCountryCode(currentLanguage);

  return supportedCountries.includes(countryDeterminedByCurLang)
    ? countryDeterminedByCurLang
    : USA;
};

export const EnterPhoneStep = () => {
  const navigate = useNavigate();
  const {
    phone,
    setPhone,
    setTokenToEnterSmsCode,
    countryCode: countryCodeFromContext,
    setCountryCode: setCountryCodeInContext,
  } = useAuthData();
  const [countryCode, setCountryCode] = useState(countryCodeFromContext);

  const {control, handleSubmit, setError} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      phone,
    },
  });

  const currentPhone = useWatch({control, name: 'phone'});

  const {loading, run} = useRequest(enterPhone, {
    manual: true,
    onSuccess: tokenToEnterOtp => {
      setPhone(currentPhone);
      setTokenToEnterSmsCode(tokenToEnterOtp);
      navigate(ROUTE__LOGIN__ENTER_CODE);
    },
    onError: () => {
      setError('phone', {
        type: 'custom',
        message: 'Incorrect phone number',
      });
    },
  });

  return (
    <StepPageLayout>
      <Box
        flex="1 1 0"
        sx={{
          backgroundImage: `url(${imageSrc})`,
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></Box>

      <form
        onSubmit={event => {
          const theReturnedFunc = handleSubmit(values => {
            setCountryCodeInContext(countryCode);
            run(values.phone, countryCode);
          });

          void theReturnedFunc(event);
        }}
        noValidate
        style={{
          background:
            'linear-gradient(90deg,rgba(212, 231, 253, 1) 0%, rgba(172, 205, 253, 1) 100%)',
        }}
      >
        <Stack
          spacing={3}
          px={2}
          pt={4}
          pb={6}
          sx={{
            border: `1px solid ${COLOR__LINE}`,
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            backgroundColor: COLOR__WHITE,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 32,
            }}
          >
            Log in or sign up
          </Typography>

          <Controller
            name="phone"
            control={control}
            render={({
              field: {ref: fieldRef, value, ...fieldProps},
              fieldState,
            }) => (
              <MuiTelInput
                onlyCountries={supportedCountries}
                {...fieldProps}
                onChange={(newValue, info) => {
                  fieldProps.onChange(newValue);
                  setCountryCode(info.countryCode ?? '');
                }}
                value={value ?? ''}
                inputRef={fieldRef}
                helperText={fieldState.error?.message}
                error={fieldState.invalid}
                defaultCountry={getDefaultCountry(browserLanguage)}
                forceCallingCode
                langOfCountryName={browserLanguage.slice(0, 2).toLowerCase()}
                sx={{
                  '& .MuiInputAdornment-root > span': {
                    borderRight: 'none',
                  },
                  '& input': {
                    borderLeft: '1px solid #e0e0e0',
                  },
                }}
                autoFocus
                slotProps={{
                  input: {
                    placeholder: 'Enter your phone number',
                  },
                }}
                getFlagElement={isoCode => {
                  return <CountryFlag countryIsoCode={isoCode} />;
                }}
              />
            )}
          />

          <Button
            type={'submit'}
            color={'primary'}
            loading={loading}
            disabled={!matchIsValidTel(currentPhone)}
          >
            Continue
          </Button>
        </Stack>
      </form>
    </StepPageLayout>
  );
};

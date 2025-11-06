import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from '@mui/material';
import {AxiosError} from 'axios';
import {useSnackbar} from 'notistack';

import {CardBox} from '@shared/components';
import {FormRow, Header} from '@widgets/common';
import {FormFields} from './FormFields';

import {
  CreatePromocodeParams,
  PromocodeStatus,
  PromocodeType,
  v8nSchemaOfCreatePromocodeParams,
} from '@/entities/promocode';
import {useCreatePromocode} from '@/entities/promocode/apiHooks';
import {getErrorMessageFromCreateEventError} from '@/shared/api';
import {COLOR__WHITE} from '@/theme/colors';

export const CreatePromocodePage = () => {
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const formMethods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(v8nSchemaOfCreatePromocodeParams),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      expires: null,
      applyCountLimit: 0,
      usageCountLimit: 0,
      usageAmountLimit: 0,
      note: '',
      type: PromocodeType.commissionFree,
      status: PromocodeStatus.active,
    },
  });
  const {handleSubmit} = formMethods;

  const {mutate: createPromocode, isPending: isCreating} = useCreatePromocode();

  const onSubmit = (values: CreatePromocodeParams): void => {
    createPromocode(values, {
      onSuccess: () => {
        navigate(-1);
      },
      onError: err => {
        let errMsg = '';
        if (err instanceof AxiosError) {
          errMsg = getErrorMessageFromCreateEventError(err);
        }

        enqueueSnackbar(`Could not create event ${errMsg}`, {
          variant: 'error',
        });
      },
    });
  };

  return (
    <>
      <Header title="Create promo-code" mb={1} />

      <CardBox bgcolor={COLOR__WHITE} maxWidth={800}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormProvider {...formMethods}>
            <FormFields />
          </FormProvider>

          <FormRow width={420} mt={3}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                navigate(-1);
              }}
              sx={{flex: 1, border: '0.4px solid #CBCDD8 !important'}}
            >
              Back
            </Button>

            <Button
              type="submit"
              sx={{flex: 2}}
              loading={isCreating}
              loadingPosition="start"
            >
              Create promo-code
            </Button>
          </FormRow>
        </form>
      </CardBox>
    </>
  );
};

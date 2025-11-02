import {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from '@mui/material';
import {useSnackbar} from 'notistack';

import {GeoFilterOption} from '@entities/common';
import {CardBox} from '@shared/components';
import {stringify} from '@shared/utils';
import {FormRow} from '@widgets/common';
import {FormFields} from '../CreateGeoFilterOption/FormFields';
import {FormValues, v8nSchema} from '../CreateGeoFilterOption/v8nSchema';

import {COLOR__WHITE} from '@/theme/colors';

interface Props {
  option: GeoFilterOption;
  onClose: () => void;
}

export const EditGeoFilterOptionForm: FC<Props> = ({option, onClose}) => {
  const {enqueueSnackbar} = useSnackbar();

  const formMethods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      name: option.name,
      logoFile: null,
    },
  });
  const {handleSubmit} = formMethods;

  const onSubmit = (values: FormValues): void => {
    enqueueSnackbar(`You entered ${stringify(values)}`, {
      variant: 'info',
      style: {
        whiteSpace: 'pre-line',
      },
    });

    onClose();
  };

  return (
    <CardBox bgcolor={COLOR__WHITE} maxWidth={450}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormProvider {...formMethods}>
          <FormFields existingLogoUrl={option.logo_url ?? ''} />
        </FormProvider>

        <FormRow width={420} mt={2}>
          <Button
            type="button"
            variant="outlined"
            onClick={onClose}
            sx={{flex: 1, border: '0.4px solid #CBCDD8 !important'}}
          >
            Back
          </Button>

          <Button type="submit" sx={{flex: 2}}>
            Apply changes
          </Button>
        </FormRow>
      </form>
    </CardBox>
  );
};

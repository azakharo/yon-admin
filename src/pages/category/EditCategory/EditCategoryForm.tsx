import {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from '@mui/material';
import {useSnackbar} from 'notistack';

import {Category} from '@entities/category';
import {CardBox} from '@shared/components';
import {stringify} from '@shared/utils';
import {FormRow} from '@widgets/common';
import {FormFields} from '../CreateCategory/FormFields';
import {FormValues, v8nSchema} from '../CreateCategory/v8nSchema';

import {COLOR__WHITE} from '@/theme/colors';

interface Props {
  category: Category;
  onClose: () => void;
}

export const EditCategoryForm: FC<Props> = ({category, onClose}) => {
  const {enqueueSnackbar} = useSnackbar();

  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      name: category.name,
      description: category.description,
      logoFile: null,
      bannerFile: null,
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
    <CardBox bgcolor={COLOR__WHITE} maxWidth={600}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormProvider {...formMethods}>
          <FormFields
            existingLogoUrl={category.logoUrl}
            existingBannerUrl={category.bannerUrl}
          />
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

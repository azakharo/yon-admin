import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from '@mui/material';
import {useSnackbar} from 'notistack';

import {CardBox} from '@shared/components';
import {stringify} from '@shared/utils';
import {FormRow, Header} from '@widgets/common';
import {FormFields} from './FormFields';
import {FormValues, v8nSchema} from './v8nSchema';

import {COLOR__WHITE} from '@/theme/colors';

export const CreateCategoryPage = () => {
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      name: '',
      description: '',
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
  };

  return (
    <>
      <Header title="Create category" mb={1} />

      <CardBox bgcolor={COLOR__WHITE} maxWidth={600}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormProvider {...formMethods}>
            <FormFields />
          </FormProvider>

          <FormRow width={420} mt={2}>
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

            <Button type="submit" sx={{flex: 2}}>
              Create event
            </Button>
          </FormRow>
        </form>
      </CardBox>
    </>
  );
};

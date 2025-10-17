import {FileWithPath, useDropzone} from 'react-dropzone';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormHelperText,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import useUpdateEffect from 'ahooks/es/useUpdateEffect';
import isNil from 'lodash/isNil';
import {InferType, mixed, object, string} from 'yup';

import {
  Category,
  CategorySelect,
  SubCategory,
  SubCategorySelect,
} from '@entities/category';
import {
  CardBox,
  FileToUploadThumbnail,
  InputType,
  RhfDateSelector,
  RhfNumberInput,
  RhfTimeField,
} from '@shared/components';
import {numberTransformEmptyStringToNull, stringify} from '@shared/utils';
import {Header} from '@widgets/common';

import {COLOR__LIGHT_BACK, COLOR__WHITE} from '@/theme/colors';

const priceSchema = numberTransformEmptyStringToNull
  .required()
  .positive('must be positive');

const v8nSchema = object().shape({
  name: string().required(),
  description: string().required(),
  category: mixed<Category>()
    .required()
    .nullable()
    .notOneOf([null], 'required'),
  subCategory: mixed<SubCategory>()
    .required()
    .nullable()
    .notOneOf([null], 'required'),
  startDate: mixed<Date>().required().nullable(),
  startTime: mixed<Date>().required().nullable(),
  endDate: mixed<Date>().required(),
  endTime: mixed<Date>().required(),
  yesPrice: priceSchema,
  noPrice: priceSchema,
  iconFile: mixed<FileWithPath>()
    .required()
    .nullable()
    .notOneOf([null], 'required'),
});

type FormValues = InferType<typeof v8nSchema>;

export const CreateEventPage = () => {
  const navigate = useNavigate();

  const {control, handleSubmit, setValue, trigger} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      name: '',
      description: '',
      category: null,
      subCategory: null,
      startDate: null,
      startTime: null,
      yesPrice: 0,
      noPrice: 0,
      iconFile: null,
    },
  });

  const currentCategory = useWatch({control, name: 'category'});
  const currentIconFile = useWatch({control, name: 'iconFile'});

  const {
    getRootProps,
    getInputProps,
    open: openFileSelectDialog,
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
      // Add other image types as needed
    },
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    onDrop: newlySelectedFiles => {
      setValue('iconFile', newlySelectedFiles[0] ?? null);
      void trigger();
    },
  });

  // Clear subcategory if category changed
  useUpdateEffect(() => {
    if (!isNil(currentCategory)) {
      setValue('subCategory', null);
    }
  }, [currentCategory?.id]);

  const onSubmit = (values: FormValues): void => {
    alert(`You entered:\n${stringify(values)}`);
  };

  return (
    <>
      <Header title="Create event" mb={1} />

      <CardBox bgcolor={COLOR__WHITE}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={4}
            mt={2}
            maxWidth={1000}
          >
            <Grid size={6}>
              <Stack spacing={5}>
                <TextFieldElement
                  name="name"
                  label="Name"
                  control={control}
                  autoFocus
                  placeholder="name"
                />

                <TextFieldElement
                  name="description"
                  label="Description"
                  control={control}
                  placeholder="description"
                  multiline
                  rows={4}
                  InputProps={{
                    inputComponent: 'textarea',
                  }}
                />

                <Box display="flex" gap={4}>
                  <RhfDateSelector
                    name="startDate"
                    control={control}
                    label={'Start date'}
                    defaultButtonText="Select date"
                  />

                  <RhfTimeField
                    name="startTime"
                    control={control}
                    label={'Start time'}
                  />
                </Box>

                <Box display="flex" gap={4}>
                  <RhfDateSelector
                    name="endDate"
                    control={control}
                    label={'End date'}
                    defaultButtonText="Select date"
                  />

                  <RhfTimeField
                    name="endTime"
                    control={control}
                    label={'End time'}
                  />
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
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
                </Box>
              </Stack>
            </Grid>

            <Grid size={6}>
              <Stack spacing={5}>
                <Controller
                  render={({field, fieldState}) => (
                    <CategorySelect
                      label="Category"
                      error={fieldState.error?.message}
                      {...field}
                    />
                  )}
                  name="category"
                  control={control}
                />

                {!!currentCategory && (
                  <CardBox bgcolor={COLOR__LIGHT_BACK}>
                    <Typography>{`Here will be additional input fields for "${currentCategory.name}" category`}</Typography>
                  </CardBox>
                )}

                <Controller
                  render={({field, fieldState}) => (
                    <SubCategorySelect
                      label="Sub-category"
                      categoryId={currentCategory?.id ?? ''}
                      error={fieldState.error?.message}
                      {...field}
                    />
                  )}
                  name="subCategory"
                  control={control}
                />

                <Box display="flex" alignItems="center" gap={2}>
                  <RhfNumberInput
                    name="yesPrice"
                    label="Cost of Yes (in cent)"
                    control={control}
                    inputType={InputType.positiveInteger}
                  />

                  <RhfNumberInput
                    name="noPrice"
                    label="Cost of No (in cent)"
                    control={control}
                    inputType={InputType.positiveInteger}
                  />
                </Box>
              </Stack>

              <Controller
                render={({fieldState}) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mt={2}
                    minHeight={58}
                  >
                    <Typography>Event icon</Typography>

                    <Box
                      {...(currentIconFile
                        ? {
                            flex: 1,
                            display: 'flex',
                            gap: 1.25,
                            flexWrap: 'wrap',
                          }
                        : undefined)}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />

                      {currentIconFile && (
                        <FileToUploadThumbnail
                          key={currentIconFile.name}
                          file={currentIconFile}
                          onRemove={() => {
                            setValue('iconFile', null);
                          }}
                        />
                      )}
                    </Box>

                    {!currentIconFile && (
                      <Button onClick={openFileSelectDialog} variant="outlined">
                        Select
                      </Button>
                    )}

                    {fieldState.invalid && (
                      <FormHelperText error>
                        {fieldState.error?.message}
                      </FormHelperText>
                    )}
                  </Box>
                )}
                name="iconFile"
                control={control}
              />
            </Grid>
          </Grid>
        </form>
      </CardBox>
    </>
  );
};

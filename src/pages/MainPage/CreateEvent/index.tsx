import {FileWithPath, useDropzone} from 'react-dropzone';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {CheckboxElement, TextFieldElement} from 'react-hook-form-mui';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Chip,
  Divider,
  FormHelperText,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import useUpdateEffect from 'ahooks/es/useUpdateEffect';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import {useSnackbar} from 'notistack';
import {array, boolean, InferType, mixed, number, object, string} from 'yup';

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
import {
  numberTransformEmptyStringToNull,
  stringDefinedButCanBeEmpty,
  stringify,
} from '@shared/utils';
import {Header, openGeoFilterDialog} from '@widgets/common';
import {Row} from './Row';

import {COLOR__WHITE} from '@/theme/colors';

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
  broadcastLink: stringDefinedButCanBeEmpty,
  sourceOfTruth: string().required(),
  rules: string().required(),
  latestNews: stringDefinedButCanBeEmpty,
  stat: stringDefinedButCanBeEmpty,
  spread: number().required(),
  geoTags: array().of(string().required()).required(),
  hasParent: boolean().required(),
  parentEvent: stringDefinedButCanBeEmpty,
  parentEventTab: stringDefinedButCanBeEmpty,
  isPromoted: boolean().required(),
  v8nType: string().required(),
  dataSource: string().required(),
  isScheduled: boolean().required(),
  permission: string().required(),
  hiddenFor: string().required(),
  youtubeVideoId: stringDefinedButCanBeEmpty.when('category', {
    is: (cat: Category | null) => {
      return cat?.id === 'youtube';
    },
    // eslint-disable-next-line unicorn/no-thenable
    then: () => string().required(),
  }),
});

type FormValues = InferType<typeof v8nSchema>;

export const CreateEventPage = () => {
  const {enqueueSnackbar} = useSnackbar();
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
      broadcastLink: 'link',
      sourceOfTruth: 'link',
      rules: 'text',
      latestNews: 'text',
      stat: 'text',
      spread: 0.1,
      geoTags: [],
      hasParent: false,
      parentEvent: 'parent event',
      parentEventTab: 'parent event tab',
      isPromoted: false,
      v8nType: 'auto',
      dataSource: 'link',
      isScheduled: true,
      permission: 'participants',
      hiddenFor: 'hidden for',
      youtubeVideoId: '',
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
    const msg = stringify(values);
    console.log(msg);

    enqueueSnackbar(`You entered:\n${msg}`, {
      variant: 'info',
      style: {
        whiteSpace: 'pre-line',
      },
    });
  };

  return (
    <>
      <Header title="Create event" mb={1} />

      <CardBox bgcolor={COLOR__WHITE}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container rowSpacing={1} columnSpacing={4} mt={2}>
            <Grid size={4}>
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

                <Row>
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
                </Row>

                <Row>
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
                </Row>

                <Row>
                  <TextFieldElement
                    name="broadcastLink"
                    label="Broadcast link"
                    control={control}
                    placeholder="link"
                  />

                  <TextFieldElement
                    name="sourceOfTruth"
                    label="Source of truth"
                    control={control}
                    placeholder="link"
                  />
                </Row>

                <Row>
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

                  <RhfNumberInput
                    name="spread"
                    label="Spread"
                    control={control}
                  />
                </Row>
              </Stack>
            </Grid>

            <Grid size={4}>
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

                <TextFieldElement
                  name="rules"
                  label="Event rules"
                  control={control}
                  placeholder="text"
                  multiline
                  rows={4}
                  InputProps={{
                    inputComponent: 'textarea',
                  }}
                />
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

              <Stack spacing={5} mt={4}>
                <TextFieldElement
                  name="latestNews"
                  label="Latest news"
                  control={control}
                  placeholder="text"
                  multiline
                  rows={4}
                  InputProps={{
                    inputComponent: 'textarea',
                  }}
                />
              </Stack>
            </Grid>

            <Grid size={4}>
              <Row>
                <TextFieldElement
                  name="stat"
                  label="Statistic"
                  control={control}
                  placeholder="text"
                  multiline
                  rows={4}
                  InputProps={{
                    inputComponent: 'textarea',
                  }}
                />
              </Row>

              <Row position="relative" left={-16} mt={2}>
                <CheckboxElement
                  name="hasParent"
                  label="Has parent?"
                  control={control}
                  labelProps={{
                    labelPlacement: 'start',
                  }}
                />
              </Row>

              <Row mt={4}>
                <TextFieldElement
                  name="parentEvent"
                  label="Parent event"
                  control={control}
                  placeholder="id"
                />

                <TextFieldElement
                  name="parentEventTab"
                  label="Parent event tab"
                  control={control}
                  placeholder="tab name"
                />
              </Row>

              <Row position="relative" left={-16} mt={2}>
                <CheckboxElement
                  name="isPromoted"
                  label="Need promotion?"
                  control={control}
                  labelProps={{
                    labelPlacement: 'start',
                  }}
                />

                <CheckboxElement
                  name="isScheduled"
                  label="Scheduled"
                  control={control}
                  labelProps={{
                    labelPlacement: 'start',
                  }}
                />
              </Row>

              <Row mt={4}>
                <TextFieldElement
                  name="v8nType"
                  label="Validation type"
                  control={control}
                  placeholder="auto or manual"
                />

                <TextFieldElement
                  name="dataSource"
                  label="Data source"
                  control={control}
                  placeholder="link"
                />
              </Row>

              <Row mt={5}>
                <TextFieldElement
                  name="permission"
                  label="Event permission"
                  control={control}
                  placeholder="who can participate"
                />

                <TextFieldElement
                  name="hiddenFor"
                  label="Event visibility"
                  control={control}
                  placeholder="hidden for whom"
                />
              </Row>

              <Controller
                render={({field: {value}}) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mt={4}
                    flexWrap="wrap"
                  >
                    <Typography>GEO tags</Typography>

                    {!isEmpty(value) &&
                      value.map(item => <Chip key={item} label={item} />)}

                    <Button
                      variant="outlined"
                      onClick={() => {
                        void openGeoFilterDialog({
                          initialFilterOptionIds: value,
                        })
                          .then((newFilterIds: string[]) => {
                            setValue('geoTags', newFilterIds);
                            return;
                          })
                          .catch(() => {});
                      }}
                    >
                      Select
                    </Button>
                  </Box>
                )}
                name="geoTags"
                control={control}
              />
            </Grid>
          </Grid>

          {currentCategory?.id === 'youtube' && (
            <Stack mt={2} spacing={2}>
              <Divider />

              <Box py={2}>
                <TextFieldElement
                  name="youtubeVideoId"
                  label="Youtube video ID"
                  control={control}
                  placeholder="id"
                />
              </Box>
            </Stack>
          )}

          <Row width={420} mt={2}>
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
          </Row>
        </form>
      </CardBox>
    </>
  );
};

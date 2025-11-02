import {useState} from 'react';
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
import {AxiosError} from 'axios';
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
import {useCreateEvent} from '@entities/event';
import {getErrorMessageFromCreateEventError} from '@shared/api';
import {
  CardBox,
  FileToUploadThumbnail,
  InputType,
  RhfDateSelector,
  RhfNumberInput,
  RhfTimeField,
  TranslateFieldButton,
} from '@shared/components';
import {createEmptyTranslationDict} from '@shared/helpers';
import {SupportedLanguage, TranslationDict} from '@shared/types';
import {
  dummyFunc,
  numberTransformEmptyStringToNull,
  setTimeFromAnotherDate,
  stringDefinedButCanBeEmpty,
} from '@shared/utils';
import {FormRow, Header, openGeoFilterDialog} from '@widgets/common';
import {openAddTranslationsDialog} from '@widgets/common/AddTranslationsDialog';

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
  startDate: mixed<Date>().required(),
  startTime: mixed<Date>().required(),
  endDate: mixed<Date>().required(),
  endTime: mixed<Date>().required(),
  yesPrice: priceSchema,
  noPrice: priceSchema,
  iconFile: mixed<FileWithPath>().required().nullable(),
  broadcastLink: stringDefinedButCanBeEmpty,
  sourceOfTruth: string().required(),
  rules: string().required(),
  latestNews: stringDefinedButCanBeEmpty,
  stat: stringDefinedButCanBeEmpty,
  spread: number().required(),
  geoTags: array().of(string().required()).required(),
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

  const [nameTranslations, setNameTranslations] = useState<TranslationDict>(
    () => {
      return createEmptyTranslationDict();
    },
  );
  const [descriptionTranslations, setDescriptionTranslations] =
    useState<TranslationDict>(() => {
      return createEmptyTranslationDict();
    });

  const {control, handleSubmit, setValue, trigger} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      name: '',
      description: '',
      category: null,
      subCategory: null,
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
      parentEvent: '',
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

  const currentName = useWatch({control, name: 'name'});
  const currentDescription = useWatch({control, name: 'description'});
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

  const {mutate: createEvent, isPending: isCreatingEvent} = useCreateEvent();

  const onSubmit = ({
    name,
    description,
    startDate,
    startTime,
    endDate,
    endTime,
    yesPrice,
    noPrice,
    subCategory,
    parentEvent,
    isPromoted,
  }: FormValues): void => {
    createEvent(
      {
        nameTrans: {...nameTranslations, [SupportedLanguage.English]: name},
        descriptionTrans: {
          ...descriptionTranslations,
          [SupportedLanguage.English]: description,
        },
        startDate: setTimeFromAnotherDate(startDate, startTime),
        endDate: setTimeFromAnotherDate(endDate, endTime),
        yesPrice,
        noPrice,
        subCategoryId: subCategory?.id ?? '',
        parentId: parentEvent || null,
        isPromotionNeeded: isPromoted,
      },
      {
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
      },
    );
  };

  return (
    <>
      <Header title="Create event" mb={1} />

      <CardBox bgcolor={COLOR__WHITE}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container rowSpacing={1} columnSpacing={4} mt={2}>
            <Grid size={4}>
              <Stack spacing={5}>
                <Box display="flex" alignItems="center" gap={2}>
                  <TextFieldElement
                    name="name"
                    label="Name"
                    control={control}
                    autoFocus
                    placeholder="name"
                    sx={{
                      flex: 1,
                    }}
                  />

                  <TranslateFieldButton
                    onClick={() => {
                      void openAddTranslationsDialog({
                        fieldName: 'Name',
                        initialTranslations: nameTranslations,
                        enTrans: currentName,
                      })
                        .then((translations: TranslationDict) => {
                          setValue(
                            'name',
                            translations[SupportedLanguage.English],
                          );
                          setNameTranslations(translations);
                          return;
                        })
                        .catch(dummyFunc);
                    }}
                  />
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
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
                    sx={{
                      flex: 1,
                    }}
                  />

                  <TranslateFieldButton
                    onClick={() => {
                      void openAddTranslationsDialog({
                        fieldName: 'Description',
                        initialTranslations: descriptionTranslations,
                        enTrans: currentDescription,
                        isMultiLineText: true,
                      })
                        .then((translations: TranslationDict) => {
                          setValue(
                            'description',
                            translations[SupportedLanguage.English],
                          );
                          setDescriptionTranslations(translations);
                          return;
                        })
                        .catch(dummyFunc);
                    }}
                  />
                </Box>

                <FormRow>
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
                </FormRow>

                <FormRow>
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
                </FormRow>

                <FormRow>
                  <TextFieldElement
                    name="broadcastLink"
                    label="Broadcast link"
                    control={control}
                    placeholder="link"
                    disabled
                  />

                  <TextFieldElement
                    name="sourceOfTruth"
                    label="Source of truth"
                    control={control}
                    placeholder="link"
                    disabled
                  />
                </FormRow>

                <FormRow>
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
                    disabled
                  />
                </FormRow>
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
                  disabled
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
                      <Button
                        onClick={openFileSelectDialog}
                        variant="outlined"
                        disabled
                      >
                        Select...
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
                  disabled
                />
              </Stack>
            </Grid>

            <Grid size={4}>
              <FormRow>
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
                  disabled
                />
              </FormRow>

              <FormRow mt={4}>
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
                  disabled
                />
              </FormRow>

              <FormRow position="relative" left={-16} mt={2}>
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
                  disabled
                />
              </FormRow>

              <FormRow mt={4}>
                <TextFieldElement
                  name="v8nType"
                  label="Validation type"
                  control={control}
                  placeholder="auto or manual"
                  disabled
                />

                <TextFieldElement
                  name="dataSource"
                  label="Data source"
                  control={control}
                  placeholder="link"
                  disabled
                />
              </FormRow>

              <FormRow mt={5}>
                <TextFieldElement
                  name="permission"
                  label="Event permission"
                  control={control}
                  placeholder="who can participate"
                  disabled
                />

                <TextFieldElement
                  name="hiddenFor"
                  label="Event visibility"
                  control={control}
                  placeholder="hidden for whom"
                  disabled
                />
              </FormRow>

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
                      disabled
                    >
                      Select...
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
                  disabled
                />
              </Box>
            </Stack>
          )}

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

            <Button type="submit" sx={{flex: 2}} disabled={isCreatingEvent}>
              Create event
            </Button>
          </FormRow>
        </form>
      </CardBox>
    </>
  );
};

import {FC} from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Grid2 as Grid, Stack, Typography} from '@mui/material';
import useUpdateEffect from 'ahooks/es/useUpdateEffect';
import isNil from 'lodash/isNil';
import {useSnackbar} from 'notistack';
import {InferType, mixed, object, string} from 'yup';

import {
  Category,
  CategorySelect,
  SubCategory,
  SubCategorySelect,
} from '@entities/category';
import {Event} from '@entities/event';
import {
  InputType,
  RhfDateSelector,
  RhfNumberInput,
  RhfTimeField,
} from '@shared/components';
import {
  humanizeDuration,
  numberTransformEmptyStringToNull,
  setTimeFromAnotherDate,
  stringDefinedButCanBeEmpty,
  stringify,
} from '@shared/utils';
import {FormRow} from '../../common/FormRow';

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
  parentEvent: stringDefinedButCanBeEmpty,
});

type FormValues = InferType<typeof v8nSchema>;

interface Props {
  event: Event;
  onClose: () => void;
}

export const EditEventForm: FC<Props> = ({event, onClose}) => {
  const {enqueueSnackbar} = useSnackbar();

  const {control, handleSubmit, setValue} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(v8nSchema),
    defaultValues: {
      name: event.name,
      description: event.description,
      category: event.category,
      subCategory: event.subCategories[0] ?? null,
      yesPrice: event.yesPrice * 100,
      noPrice: event.noPrice * 100,
      parentEvent: '',
      startDate: event.startDate,
      startTime: event.startDate,
    },
  });

  const currentCategory = useWatch({control, name: 'category'});
  const currentEndDate = useWatch({control, name: 'endDate'});
  const currentEndTime = useWatch({control, name: 'endTime'});

  let remainingTimeString = '';
  if (!isNil(currentEndDate) && !isNil(currentEndTime)) {
    const endDateTime = setTimeFromAnotherDate(currentEndDate, currentEndTime);
    const remainingMs = endDateTime.getTime() - Date.now();
    if (remainingMs > 0) {
      remainingTimeString = humanizeDuration(remainingMs / 1000);
    }
  }

  // Clear subcategory if category changed
  useUpdateEffect(() => {
    if (!isNil(currentCategory)) {
      setValue('subCategory', null);
    }
  }, [currentCategory?.id]);

  const onSubmit = (values: FormValues): void => {
    enqueueSnackbar(`You entered:\n${stringify(values)}`, {
      variant: 'info',
      style: {
        whiteSpace: 'pre-line',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container rowSpacing={1} columnSpacing={4} mt={2}>
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

            <FormRow>
              <Box display="flex" gap={2}>
                <Typography>Status: </Typography>
                <Typography>
                  <strong>{event.status}</strong>
                </Typography>
              </Box>

              <Box display="flex" gap={2}>
                <Typography>Result:</Typography>
                <Typography>
                  <strong>{event.result}</strong>
                </Typography>
              </Box>
            </FormRow>

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

            <FormRow sx={{marginTop: '18px !important'}}>
              <Box display="flex" gap={2}>
                <Typography>Remaining time: </Typography>
                {remainingTimeString && (
                  <Typography>
                    <strong>{remainingTimeString}</strong>
                  </Typography>
                )}
              </Box>
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
            </FormRow>
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
              name="parentEvent"
              label="Parent event"
              control={control}
              placeholder="id"
            />
          </Stack>
        </Grid>
      </Grid>

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
  );
};

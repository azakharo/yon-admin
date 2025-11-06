import {Controller, useFormContext} from 'react-hook-form';
import {TextFieldElement} from 'react-hook-form-mui';
import {Stack} from '@mui/material';

import {CreatePromocodeParams} from '@/entities/promocode';
import {PromocodeStatusSelect} from '@/entities/promocode/components/PromocodeStatusSelect';
import {PromocodeTypeSelect} from '@/entities/promocode/components/PromocodeTypeSelect';
import {InputType, RhfDateSelector, RhfNumberInput} from '@/shared/components';
import {FormRow} from '@/widgets/common';

export const FormFields = () => {
  const {control} = useFormContext<CreatePromocodeParams>();

  return (
    <Stack spacing={5} mt={2}>
      <FormRow>
        <TextFieldElement
          name="code"
          label="Code"
          control={control}
          autoFocus
          placeholder="Code"
        />

        <RhfDateSelector
          name="expires"
          control={control}
          label={'Expared at'}
          defaultButtonText="Select date"
        />
      </FormRow>

      <FormRow>
        <TextFieldElement
          name="name"
          label="Name"
          control={control}
          placeholder="name"
        />

        <TextFieldElement
          name="description"
          label="Description"
          control={control}
          placeholder="Description"
          multiline
          rows={4}
          InputProps={{
            inputComponent: 'textarea',
          }}
        />
      </FormRow>

      <FormRow>
        <Controller
          render={({field, fieldState}) => (
            <PromocodeTypeSelect {...field} error={fieldState.error?.message} />
          )}
          name="type"
          control={control}
        />

        <Controller
          render={({field, fieldState}) => (
            <PromocodeStatusSelect
              {...field}
              error={fieldState.error?.message}
            />
          )}
          name="status"
          control={control}
        />
      </FormRow>

      <FormRow>
        <RhfNumberInput
          name="applyCountLimit"
          label="Apply count limit"
          control={control}
          inputType={InputType.positiveInteger}
        />

        <RhfNumberInput
          name="usageCountLimit"
          label="Usage count limit"
          control={control}
          inputType={InputType.positiveInteger}
        />

        <RhfNumberInput
          name="usageAmountLimit"
          label="Usage amount limit"
          control={control}
          inputType={InputType.positiveInteger}
        />
      </FormRow>

      <TextFieldElement
        name="note"
        label="Note"
        control={control}
        placeholder="Note"
        multiline
        rows={4}
        InputProps={{
          inputComponent: 'textarea',
        }}
      />
    </Stack>
  );
};

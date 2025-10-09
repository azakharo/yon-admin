import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {FormControl, InputLabel} from '@mui/material';

import {NumberInput, NumberInputProps} from './index';

type Props<TFieldValues extends FieldValues> = NumberInputProps & {
  name: Path<TFieldValues>;
  label: string;
  control?: Control<TFieldValues>;
};

export const RhfNumberInput = <TFormValues extends FieldValues>({
  name,
  label,
  control,
  ...restProps
}: Props<TFormValues>) => {
  return (
    <Controller
      render={({field, fieldState}) => (
        <FormControl sx={{width: '100%'}}>
          <InputLabel>{label}</InputLabel>

          <NumberInput
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            {...field}
            {...restProps}
          />
        </FormControl>
      )}
      name={name}
      control={control}
    />
  );
};

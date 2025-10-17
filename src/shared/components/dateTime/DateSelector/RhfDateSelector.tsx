import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {FormControl, FormHelperText, InputLabel} from '@mui/material';

import {DateSelector, DateSelectorProps} from './index';

type Props<TFieldValues extends FieldValues> = Omit<
  DateSelectorProps,
  'value' | 'onChange'
> & {
  name: Path<TFieldValues>;
  label: string;
  control?: Control<TFieldValues>;
};

export const RhfDateSelector = <TFormValues extends FieldValues>({
  name,
  label,
  control,
  ...restProps
}: Props<TFormValues>) => {
  return (
    <Controller
      render={({field: {ref, value, ...restFieldProps}, fieldState}) => (
        <FormControl sx={{position: 'relative'}}>
          <InputLabel>{label}</InputLabel>

          <DateSelector
            {...restFieldProps}
            {...restProps}
            value={value ?? undefined}
          />

          {fieldState.invalid && (
            <FormHelperText
              error
              sx={{position: 'absolute', left: 0, bottom: -18}}
            >
              {fieldState.error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
      name={name}
      control={control}
    />
  );
};

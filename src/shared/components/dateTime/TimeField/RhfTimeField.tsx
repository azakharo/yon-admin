import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {FormControl, FormHelperText, InputLabel} from '@mui/material';
import {TimeField, TimeFieldProps} from '@mui/x-date-pickers';

type Props<TFieldValues extends FieldValues> = Omit<
  TimeFieldProps<Date>,
  'value' | 'onChange'
> & {
  name: Path<TFieldValues>;
  label: string;
  control?: Control<TFieldValues>;
};

export const RhfTimeField = <TFormValues extends FieldValues>({
  name,
  label,
  control,
  ...restProps
}: Props<TFormValues>) => {
  return (
    <Controller
      render={({field: {ref, ...restFieldProps}, fieldState}) => (
        <FormControl sx={{position: 'relative'}}>
          <InputLabel>{label}</InputLabel>

          <TimeField
            format="HH:mm"
            {...restFieldProps}
            {...restProps}
            ref={ref}
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

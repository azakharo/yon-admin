import {FC, useState} from 'react';
import {Button, Stack} from '@mui/material';
import {format} from 'date-fns';

import {
  DayPicker,
  FilterButtonWithPopover,
  FilterComponentProps,
} from '@shared/components';

const PopoverContent: FC<FilterComponentProps<Date | undefined>> = ({
  value,
  onChange,
  onFinish,
}) => {
  const [date, setDate] = useState<Date | undefined>(value);

  return (
    <Stack p={2} spacing={2}>
      <DayPicker
        mode="single"
        selected={date}
        onSelect={val => {
          setDate(val);
        }}
        defaultMonth={date}
      />

      <Stack direction="row" spacing={4} justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => {
            onFinish();
          }}
          fullWidth
        >
          Cancel
        </Button>

        <Button
          onClick={() => {
            onChange(date);
            onFinish();
          }}
          fullWidth
        >
          Apply
        </Button>
      </Stack>
    </Stack>
  );
};

export type DateSelectorProps = Omit<
  FilterComponentProps<Date | undefined>,
  'onFinish'
> & {
  defaultButtonText: string;
};

export const DateSelector: FC<DateSelectorProps> = ({
  value,
  onChange,
  defaultButtonText,
}) => {
  return (
    <FilterButtonWithPopover
      buttonText={value ? format(value, 'MMMM d') : defaultButtonText}
      buttonVariant="outlined"
      FilterComponent={PopoverContent}
      value={value}
      onChange={onChange}
    />
  );
};

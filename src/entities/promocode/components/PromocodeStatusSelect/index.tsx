import {forwardRef} from 'react';

import {Select, SelectOption, SelectProps} from '@shared/components';
import {PromocodeStatus} from '../../types';

type Props = Omit<SelectProps, 'options'>;

const options: SelectOption[] = Object.values(PromocodeStatus).map(status => ({
  value: status,
  label: status,
}));

export const PromocodeStatusSelect = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    return (
      <Select
        options={options}
        label="Status"
        inputPlaceholder="Select status"
        {...props}
        ref={ref}
      />
    );
  },
);

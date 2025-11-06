import {forwardRef} from 'react';

import {Select, SelectOption, SelectProps} from '@shared/components';
import {PromocodeType} from '../../types';

type Props = Omit<SelectProps, 'options'>;

const options: SelectOption[] = Object.values(PromocodeType).map(t => ({
  value: t,
  label: t,
}));

export const PromocodeTypeSelect = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    return (
      <Select
        options={options}
        label="Type"
        inputPlaceholder="Select promo type"
        {...props}
        ref={ref}
      />
    );
  },
);

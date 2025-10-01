import {FC, useRef} from 'react';
import {Checkbox as MuiCheckbox, CheckboxProps} from '@mui/material';
import useHover from 'ahooks/es/useHover';

import {CheckedIcon} from './CheckedIcon';
import {HoverCheckedIcon} from './HoverCheckedIcon';
import {HoverUncheckedIcon} from './HoverUncheckedIcon';
import {UncheckedIcon} from './UncheckedIcon';

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  disabled,
  sx,
  ...restProps
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const isHovering = useHover(ref);

  const uncheckedIcon = isHovering ? <HoverUncheckedIcon /> : <UncheckedIcon />;
  const checkedIcon = isHovering ? <HoverCheckedIcon /> : <CheckedIcon />;

  return (
    <MuiCheckbox
      inputRef={ref}
      checked={checked}
      disabled={disabled}
      sx={{
        '@media(hover: hover)': {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        opacity: disabled ? 0.5 : undefined,
        ...sx,
      }}
      icon={disabled ? <UncheckedIcon /> : uncheckedIcon}
      checkedIcon={disabled ? <CheckedIcon /> : checkedIcon}
      {...restProps}
    />
  );
};

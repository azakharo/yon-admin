import {FC} from 'react';
import {Typography} from '@mui/material';
import isNil from 'lodash/isNil';

import {CountValue, CurrencyValue} from '@shared/components';
import {Color} from '@shared/types';

import {COLOR__GRAY} from '@/theme/colors';

interface Props {
  value: number | null;
  isCurrency?: boolean;
  isForceShowingSign?: boolean;
  isPrimary: boolean;
  // The color is determined by primary/secondary, but can be overridden by the following prop
  color?: Color;
}

export const NumberValue: FC<Props> = ({
  value,
  isCurrency = true,
  isForceShowingSign = false,
  isPrimary,
  color,
}) => {
  if (isNil(value)) {
    return null;
  }

  const valueElement = isCurrency ? (
    <CurrencyValue value={value} />
  ) : (
    <CountValue value={value} />
  );

  return (
    <Typography
      variant={isPrimary ? 'b2bold' : 'b2medium'}
      sx={{color: color ?? (isPrimary ? undefined : COLOR__GRAY)}}
    >
      {isForceShowingSign && value > 0 && '+'}
      {valueElement}
    </Typography>
  );
};

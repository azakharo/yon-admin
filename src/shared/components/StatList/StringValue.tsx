import {FC} from 'react';
import {Typography} from '@mui/material';

import {Color} from '@shared/types';

import {COLOR__GRAY} from '@/theme/colors';

interface Props {
  value: string;
  isPrimary: boolean;
  // The color is determined by primary/secondary, but can be overridden by the following prop
  color?: Color;
}

export const StringValue: FC<Props> = ({value, isPrimary, color}) => {
  return (
    <Typography
      variant={isPrimary ? 'b2bold' : 'b2medium'}
      sx={{color: color ?? (isPrimary ? undefined : COLOR__GRAY)}}
    >
      {value}
    </Typography>
  );
};

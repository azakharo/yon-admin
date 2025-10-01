import {FC} from 'react';
import {Box, BoxProps, LinearProgress} from '@mui/material';

import {Color} from '../../types';

import {COLOR__LINE} from '@/theme/colors';

interface Props extends BoxProps {
  color: Color;
  value: number;
}

export const ProgressBar: FC<Props> = ({color, value, ...restProps}) => {
  return (
    <Box {...restProps}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6,
          borderRadius: '3px',
          backgroundColor: COLOR__LINE,
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
          },
        }}
      />
    </Box>
  );
};

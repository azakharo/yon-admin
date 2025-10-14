import {FC} from 'react';
import {Typography} from '@mui/material';

import {COLOR__LIGHT_GRAY} from '@/theme/colors';

interface Props {
  label: string;
}

export const SecondaryLabel: FC<Props> = ({label}) => {
  return (
    <Typography variant="b3medium" sx={{color: COLOR__LIGHT_GRAY}}>
      {label}
    </Typography>
  );
};

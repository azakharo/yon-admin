import {FC} from 'react';
import {Typography} from '@mui/material';

import {Color} from '@shared/types';

interface Props {
  count: number;
  label: string;
  color: Color;
}

export const OrderCountBox: FC<Props> = ({count, label, color}) => {
  return (
    <Typography
      component="div"
      sx={{
        width: 'fit-content',
        padding: '6px 7px',
        border: '1px solid #E6E6E6',
        borderRadius: '4px',
        boxShadow: '0px 1.5px 4px -1px #0A090B12',
        color,
        fontWeight: 500,
        fontSize: 13,
        lineHeight: '16px',
      }}
    >
      {`${count} ${label}`}
    </Typography>
  );
};

import {FC} from 'react';
import {Box, Stack, Typography} from '@mui/material';

import {CurrencyValue} from '@shared/components';
import {WalletIcon} from '@shared/icons';
import {Color} from '@shared/types';

import {
  COLOR__ERROR,
  COLOR__MAGENTA,
  COLOR__PRIMARY,
  COLOR__SUCCESS,
} from '@/theme/colors';

interface Props {
  value: number;
  isBonus: boolean;
}

export const BalanceValue: FC<Props> = ({value, isBonus}) => {
  const iconColor = isBonus ? COLOR__PRIMARY : COLOR__MAGENTA;
  // eslint-disable-next-line unicorn/no-useless-undefined
  let valueColor: Color | undefined = undefined;
  if (value < 0) {
    valueColor = COLOR__ERROR;
  } else if (value > 0) {
    valueColor = COLOR__SUCCESS;
  }

  if (value === 0) {
    return null;
  }

  return (
    <Stack spacing={0.5} alignItems="flex-end">
      <Typography variant="b4bold" sx={{color: valueColor}}>
        {value > 0 && '+'}
        <CurrencyValue value={value} />
      </Typography>

      <Box display="flex" alignItems="center" gap={0.5}>
        <WalletIcon sx={{fontSize: 16, color: iconColor}} />

        <Typography variant="b5medium">{isBonus ? 'Promo' : 'Real'}</Typography>
      </Box>
    </Stack>
  );
};

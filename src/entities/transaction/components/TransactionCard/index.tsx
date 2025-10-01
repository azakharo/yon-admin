import {FC} from 'react';
import {Box, BoxProps, ButtonBase, Stack, Typography} from '@mui/material';
import {format} from 'date-fns';

import {CardBox, TextLimitedNChars} from '@shared/components';
import {useNotImplementedToast} from '@shared/hooks';
import {CalendarFilledIcon, ClockIcon} from '@shared/icons';
import {Transaction} from '../../types';
import {BalanceValue} from './BalanceValue';
import {ColorLabel} from './ColorLabel';

import {COLOR__GRAY, COLOR__LIGHT_GRAY} from '@/theme/colors';

const iconStyles = {fontSize: 14} as const;

export interface Props extends BoxProps {
  transaction: Transaction;
}

export const TransactionCard: FC<Props> = ({transaction, ...restProps}) => {
  const {id, meta, created, label, value, bonus, relatedEntity} = transaction;
  const showNotImplemented = useNotImplementedToast();

  const cardElem = (
    <CardBox
      isBordered
      display="flex"
      gap={2}
      flexWrap="nowrap"
      justifyContent="space-between"
      {...restProps}
    >
      <Stack spacing={1} alignItems="flex-start">
        <Box display="flex" alignItems="center" gap={1}>
          <TextLimitedNChars variant="b4bold" text={id} limit={16} />
          {label && <ColorLabel text={label} />}
        </Box>

        {meta.map(item => (
          <TextLimitedNChars
            key={item}
            variant="b5medium"
            sx={{color: COLOR__GRAY}}
            text={item}
            limit={28}
          />
        ))}

        <Box display="flex" gap={2} color={COLOR__LIGHT_GRAY}>
          <Box display="flex" alignItems="center" gap={0.75}>
            <ClockIcon sx={iconStyles} />

            <Typography variant="b5medium" sx={{color: COLOR__LIGHT_GRAY}}>
              {format(created, 'HH:mm:ss')}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.75}>
            <CalendarFilledIcon sx={iconStyles} />

            <Typography variant="b5medium" sx={{color: COLOR__LIGHT_GRAY}}>
              {format(created, 'MMM d, yyyy').replaceAll('.', '')}
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Stack spacing={1}>
        <BalanceValue value={value} isBonus={false} />
        <BalanceValue value={bonus} isBonus />
      </Stack>
    </CardBox>
  );

  if (!relatedEntity) {
    return cardElem;
  }

  return <ButtonBase onClick={showNotImplemented}>{cardElem}</ButtonBase>;
};

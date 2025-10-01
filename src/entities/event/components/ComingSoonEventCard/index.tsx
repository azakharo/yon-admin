import {FC} from 'react';
import {Box, BoxProps, Stack, Typography} from '@mui/material';
import {format} from 'date-fns';

import {Event} from '../../types';

import {
  COLOR__ERROR,
  COLOR__LIGHT_BACK,
  COLOR__LIGHT_GRAY,
  COLOR__LINE,
  COLOR__WHITE,
} from '@/theme/colors';

const dateBlockBorderRadius = '6px';

export interface Props extends BoxProps {
  event: Event;
}

export const ComingSoonEventCard: FC<Props> = ({event, ...restProps}) => {
  const {name, startDate} = event;

  return (
    <Box
      p={1}
      borderRadius="12px"
      border={`0.7px solid ${COLOR__LINE}`}
      {...restProps}
    >
      <Stack direction="row" spacing={1.5}>
        {/* Date */}
        <Stack>
          <Typography
            variant="b5bold"
            sx={{
              color: COLOR__WHITE,
              backgroundColor: COLOR__ERROR,
              display: 'block',
              paddingY: 0.5,
              paddingX: 1.5,
              borderTopLeftRadius: dateBlockBorderRadius,
              borderTopRightRadius: dateBlockBorderRadius,
            }}
          >
            {format(startDate, 'MMM').replaceAll('.', '').toUpperCase()}
          </Typography>

          <Typography
            variant="b4medium"
            sx={{
              backgroundColor: COLOR__LIGHT_BACK,
              display: 'block',
              paddingY: 0.5,
              paddingX: 1.5,
              textAlign: 'center',
              borderBottomLeftRadius: dateBlockBorderRadius,
              borderBottomRightRadius: dateBlockBorderRadius,
            }}
          >
            {format(startDate, 'd')}
          </Typography>
        </Stack>

        {/* Name and time */}
        <Stack>
          <Typography
            noWrap
            sx={{
              fontSize: 14,
              fontWeight: 500,
              display: 'block',
              maxWidth: '10ch',
              paddingY: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="b5medium"
            sx={{
              color: COLOR__LIGHT_GRAY,
              display: 'block',
              paddingY: 0.5,
            }}
          >
            {format(startDate, 'HH:mm')}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

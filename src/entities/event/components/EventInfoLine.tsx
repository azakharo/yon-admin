import {FC} from 'react';
import {useIsMobile} from '@features/responsive';
import {Box, Typography} from '@mui/material';
import {format} from 'date-fns';

import {CurrencyValue} from '@shared/components';
import {BarChartIcon, CalendarOutlinedIcon} from '@shared/icons';

import {COLOR__LIGHT_GRAY, COLOR__PRIMARY} from '@/theme/colors';

interface Props {
  categoryName: string;
  categoryLogoUrl: string;
  startDate: Date;
  tradingVolume: number;
}

export const EventInfoLine: FC<Props> = ({
  categoryName,
  categoryLogoUrl,
  startDate,
  tradingVolume,
}) => {
  const isMobile = useIsMobile();

  return (
    <Box display="flex" gap={1.5} alignItems="center" flexWrap="wrap">
      <Box display="flex" gap={0.5} alignItems="center">
        <img src={categoryLogoUrl} alt="" width="auto" height={16} />

        <Typography
          variant="b4medium"
          sx={{
            color: COLOR__LIGHT_GRAY,
            ...(isMobile
              ? {
                  maxWidth: '10ch',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }
              : undefined),
          }}
        >
          {categoryName}
        </Typography>
      </Box>

      <Box display="flex" gap={0.5} alignItems="center">
        <CalendarOutlinedIcon sx={{fontSize: 16, color: COLOR__PRIMARY}} />

        <Typography variant="b4medium" noWrap>
          {format(startDate, 'MMM d, yy').replaceAll('.', '')}
        </Typography>
      </Box>

      <Box display="flex" gap={0.5} alignItems="center">
        <BarChartIcon sx={{fontSize: 18}} />

        <Typography
          variant="b4medium"
          sx={{
            color: COLOR__LIGHT_GRAY,
          }}
        >
          <CurrencyValue value={tradingVolume} />
        </Typography>
      </Box>
    </Box>
  );
};

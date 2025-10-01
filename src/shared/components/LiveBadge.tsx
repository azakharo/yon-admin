import {FC} from 'react';
import {Badge, BadgeProps} from '@mui/material';

import {COLOR__WHITE} from '@/theme/colors';
import {boldProps} from '@/theme/typography';

export const LiveBadge: FC<BadgeProps> = props => {
  return (
    <Badge
      badgeContent="LIVE"
      color="warning"
      sx={{
        '& .MuiBadge-badge': {
          borderRadius: '5px',
          backgroundColor: '#BC1C1C',
          color: COLOR__WHITE,
          paddingX: 0.75,
          paddingY: 0,
          right: 10,
          top: 3,
          ...boldProps,
          fontSize: 8,
          maxHeight: '16px',
          letterSpacing: '1.5px',
        },
      }}
      {...props}
    />
  );
};

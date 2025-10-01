import {FC} from 'react';
import {Badge, badgeClasses, BadgeProps} from '@mui/material';

import {COLOR__WHITE} from '@/theme/colors';

const badgeSize = 15;

export const FilterSetBadge: FC<BadgeProps> = props => {
  return (
    <Badge
      variant="dot"
      color="warning"
      sx={{
        [`& .${badgeClasses.dot}`]: {
          width: badgeSize,
          height: badgeSize,
          borderRadius: '50%',
          border: `3px solid ${COLOR__WHITE}`,
        },
        '& .MuiBadge-badge': {
          right: 3,
          top: 3,
        },
      }}
      {...props}
    />
  );
};

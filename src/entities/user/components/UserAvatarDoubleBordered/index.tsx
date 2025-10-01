import {FC} from 'react';
import {darken} from '@mui/material/styles';

import {UserAvatar, UserAvatarProps} from '../UserAvatar';

import {COLOR__LINE} from '@/theme/colors';

export const UserAvatarDoubleBordered: FC<UserAvatarProps> = ({
  sx,
  ...restProps
}) => {
  return (
    <UserAvatar
      sx={{
        border: '2px solid #fff',
        outline: `2px solid ${COLOR__LINE}`,
        '@media(hover: hover)': {
          '&:hover': {
            outlineColor: darken(COLOR__LINE, 0.1),
          },
        },
        ...sx,
      }}
      {...restProps}
    />
  );
};

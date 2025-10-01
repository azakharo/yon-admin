import {FC} from 'react';
import {Avatar, AvatarProps, Typography} from '@mui/material';

import {getNameInitials} from '@shared/utils';

export interface UserAvatarProps extends AvatarProps {
  name: string;
  photoUrl?: string;
  size?: number;
  color?: string;
  bgColor?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({
  name,
  photoUrl,
  size,
  color = 'white',
  bgColor,
  sx,
  onClick,
  ...restProps
}) => {
  const initials = getNameInitials(name);

  return (
    <Avatar
      onClick={onClick}
      alt={name}
      sx={{
        ...sx,
        width: size,
        height: size,
        backgroundColor: bgColor,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        '&:hover': {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...sx?.['&:hover'],
          cursor: onClick ? 'pointer' : undefined,
        },
      }}
      src={photoUrl}
      {...restProps}
    >
      {initials && (
        <Typography
          sx={{
            fontSize: size ? size / 2 : size,
            fontWeight: 500,
            color,
          }}
        >
          {initials}
        </Typography>
      )}
    </Avatar>
  );
};

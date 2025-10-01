import {FC} from 'react';
import {Box, BoxProps} from '@mui/material';
import {darken} from '@mui/material/styles';

import {UserProfileButton} from '@entities/user';

import Logo from '@/shared/images/logo.svg?react';
import {COLOR__PRIMARY_LIGHT} from '@/theme/colors';

export const Header: FC<BoxProps> = props => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      px={2}
      py={0.5}
      bgcolor={darken(COLOR__PRIMARY_LIGHT, 0.05)}
      {...props}
    >
      <Box textAlign="center">
        <Logo width={87} height={'100%'} />
      </Box>

      <UserProfileButton />
    </Box>
  );
};

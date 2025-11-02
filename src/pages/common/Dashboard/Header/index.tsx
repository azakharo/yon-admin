import {FC} from 'react';
import {Box, BoxProps} from '@mui/material';

import {UserProfileButton} from '@entities/user';

import Logo from '@/shared/images/logo.svg?react';
import {COLOR__HEADER_BG} from '@/theme/colors';

export const Header: FC<BoxProps> = props => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      px={2}
      py={0.5}
      bgcolor={COLOR__HEADER_BG}
      {...props}
    >
      <Box textAlign="center">
        <Logo width={87} height={'100%'} />
      </Box>

      <UserProfileButton />
    </Box>
  );
};

import {FC} from 'react';
import {Box, BoxProps} from '@mui/material';

import {UserProfileButton} from '@entities/user';

import Logo from '@/shared/images/logo.svg?react';

export const Header: FC<BoxProps> = props => {
  return (
    <Box
      component="header"
      display="flex"
      alignItems="center"
      mb={1}
      gap={1}
      {...props}
    >
      <UserProfileButton />

      <Box flex="1" textAlign="center">
        <Logo width={57} height={'100%'} />
      </Box>
    </Box>
  );
};

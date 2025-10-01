import {useAuth} from '@features/auth';
import {Box, Stack, Typography} from '@mui/material';

import {UserAvatarDoubleBordered} from '@entities/user';
import {Header} from '@widgets/common';
import {SettingsMenu} from '@widgets/user/currentUserProfile';

import {COLOR__GRAY} from '@/theme/colors';

export const CurrentUserProfilePage = () => {
  const {currentUser} = useAuth();
  const {name, avatar, username} = currentUser!;

  return (
    <Box
      px={2}
      pt={1}
      maxWidth="fit-content"
      margin="0 auto"
      display="flex"
      flexDirection="column"
      flexWrap="nowrap"
    >
      <Header title={'Profile'} mb={1} rightPart={<SettingsMenu />} />

      <Stack spacing={1} alignItems="center" pt={0.25} mb={4}>
        <UserAvatarDoubleBordered name={name} photoUrl={avatar} size={100} />

        <Typography sx={{fontSize: 20, fontWeight: 800}}>
          {name || username}
        </Typography>

        <Typography variant="b3regular" sx={{color: COLOR__GRAY}}>
          @{username}
        </Typography>
      </Stack>
    </Box>
  );
};

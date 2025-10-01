import {useAuth} from '@features/auth';
import {Button, Stack, Typography} from '@mui/material';

import {UserAvatarDoubleBordered} from '@entities/user';
import {SimplePageLayout} from '@shared/layouts';
import {Header} from '@widgets/common';

import {COLOR__GRAY, COLOR__HEADER_BG} from '@/theme/colors';

export const CurrentUserProfilePage = () => {
  const {currentUser, logout} = useAuth();
  const {name, avatar, username} = currentUser!;

  return (
    <SimplePageLayout
      header={
        <Header title="Profile" minHeight={66} bgcolor={COLOR__HEADER_BG} />
      }
      mainContent={
        <Stack spacing={1} alignItems="center" pt={0.25} mb={4}>
          <UserAvatarDoubleBordered name={name} photoUrl={avatar} size={100} />

          <Typography sx={{fontSize: 20, fontWeight: 800}}>
            {name || username}
          </Typography>

          <Typography variant="b3regular" sx={{color: COLOR__GRAY}}>
            @{username}
          </Typography>

          <Button onClick={logout}>Logout</Button>
        </Stack>
      }
    />
  );
};

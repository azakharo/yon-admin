import {useNavigate} from 'react-router-dom';
import {useAuth} from '@features/auth';
import {Box, ButtonBase, IconButton, Typography} from '@mui/material';

import {ROUTE__CURRENT_USER_PROFILE} from '@shared/constants';
import {UserAvatarDoubleBordered} from '../UserAvatarDoubleBordered';

export const UserProfileButton = () => {
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  const {name, avatar} = currentUser!;

  const handleClick = () => {
    navigate(ROUTE__CURRENT_USER_PROFILE);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton size="small" onClick={handleClick}>
        <UserAvatarDoubleBordered name={name} photoUrl={avatar} size={48} />
      </IconButton>

      <ButtonBase onClick={handleClick}>
        <Typography>{name}</Typography>
      </ButtonBase>
    </Box>
  );
};

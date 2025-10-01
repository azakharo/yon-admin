import {useNavigate} from 'react-router-dom';
import {useAuth} from '@features/auth';
import {IconButton} from '@mui/material';

import {ROUTE__CURRENT_USER_PROFILE} from '@shared/constants';
import {UserAvatarDoubleBordered} from '../UserAvatarDoubleBordered';

export const UserProfileButton = () => {
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  const {name, avatar} = currentUser!;

  const handleAvatarClick = () => {
    navigate(ROUTE__CURRENT_USER_PROFILE);
  };

  return (
    <IconButton size="small" onClick={handleAvatarClick}>
      <UserAvatarDoubleBordered name={name} photoUrl={avatar} size={48} />
    </IconButton>
  );
};

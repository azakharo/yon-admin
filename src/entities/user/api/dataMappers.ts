import {currencyValueDivider} from '@shared/constants';
import {CurrentUser, User} from '../types';
import {CurrentUserOnBackend, UserOnBackend} from './backendTypes';

export const mapCurrentUserFromBackend = ({
  username,
  name,
  bio,
  avatar,
  email,
  cell_phone,
}: CurrentUserOnBackend): CurrentUser => ({
  username,
  name,
  bio: bio ?? '',
  avatar: avatar ?? '',
  email: email ?? '',
  phone: cell_phone,
});

export const mapUserFromBackend = ({
  id,
  username,
  name,
  cell_phone,
  avatar,
  email,
  country,
  is_verified,
  is_admin,
  real_funds,
  promo_funds,
}: UserOnBackend): User => ({
  id,
  username,
  name,
  phone: cell_phone,
  avatar: avatar ?? '',
  email: email ?? '',
  country,
  isVerified: is_verified,
  isAdmin: is_admin,
  fundsReal: real_funds / currencyValueDivider,
  fundsPromo: promo_funds / currencyValueDivider,
});

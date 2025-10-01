import {currencyValueDivider} from '@shared/constants';
import {LeaderBoardPosition, OtherUser, User, UserBalance} from '../types';
import {
  LeaderBoardPositionOnBackend,
  OtherUserOnBackend,
  UserBalanceOnBackend,
  UserOnBackend,
} from './backendTypes';

export const mapOtherUserFromBackend = ({
  username,
  name,
  bio,
  avatar,
}: OtherUserOnBackend): OtherUser => ({
  username,
  name,
  bio: bio ?? '',
  avatar: avatar ?? '',
});

export const mapUserFromBackend = ({
  email,
  cell_phone,
  ...restProps
}: UserOnBackend): User => ({
  ...mapOtherUserFromBackend(restProps),
  email: email ?? '',
  phone: cell_phone,
});

export const mapLeaderBoardPositionFromBackend = ({
  profile,
  profit,
  place,
}: LeaderBoardPositionOnBackend): LeaderBoardPosition => ({
  user: mapOtherUserFromBackend(profile),
  profit,
  position: place,
});

export const mapUserBalanceFromBackend = ({
  real_amount,
  promo_amount,
  invested,
  withdraw,
}: UserBalanceOnBackend): UserBalance => ({
  value: real_amount / currencyValueDivider,
  bonus: promo_amount / currencyValueDivider,
  total: (real_amount + promo_amount) / currencyValueDivider,
  invested: invested / currencyValueDivider,
  availableToWithdraw: withdraw / currencyValueDivider,
});

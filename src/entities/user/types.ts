export interface OtherUser {
  username: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface User extends OtherUser {
  phone: string;
  email: string;
}

export interface LeaderBoardPosition {
  user: OtherUser;
  profit: number;
  position: number;
}

export interface UserBalance {
  value: number; // in $
  bonus: number; // in $
  total: number;
  invested: number; // in $
  availableToWithdraw: number; // in $
}

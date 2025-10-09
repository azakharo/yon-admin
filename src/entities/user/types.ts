export interface CurrentUser {
  username: string;
  name: string;
  avatar: string;
  bio: string;
  phone: string;
  email: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  phone: string;
  avatar: string;
  email: string;
  country: string;
  isVerified: boolean;
  isAdmin: boolean;
  fundsReal: number;
  fundsPromo: number;
}

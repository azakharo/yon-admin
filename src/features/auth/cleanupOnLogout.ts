import {queryClient} from '@shared/setup';
import {
  remAuthTokenFromLocalStorage,
  remRefreshTokenFromLocalStorage,
} from './helpers/localStorage';

export const clearOnLogout = (): void => {
  queryClient.clear();
  remAuthTokenFromLocalStorage();
  remRefreshTokenFromLocalStorage();
};

import {AxiosResponse} from 'axios';
import memoize from 'memoize';

import {validateData} from '@shared/utils';
import {clearOnLogout} from '../cleanupOnLogout';
import {
  getRefreshTokenFromLocalStorage,
  setAuthTokenInLocalStorage,
  setRefreshTokenInLocalStorage,
} from '../helpers/localStorage';
import {axi} from './axiosSetup';
import {v8nSchemaOfEnterSmsCodeResponse} from './backendSchemas';
import {EnterSmsCodeResponse} from './backendTypes';

const handleError = () => {
  clearOnLogout();
  window.location.reload();
};

// Returns new auth token
const _refreshToken = async (): Promise<string> => {
  const currentRefreshToken = getRefreshTokenFromLocalStorage();

  if (!currentRefreshToken) {
    handleError();
    return '';
  }

  let response;
  try {
    response = await axi.post<
      {
        refresh_token: string;
      },
      AxiosResponse<EnterSmsCodeResponse>
    >('/auth/refresh_token', {
      refresh_token: currentRefreshToken,
    });
  } catch (error) {
    handleError();
    return '';
  }

  const data = response.data;
  validateData(data, v8nSchemaOfEnterSmsCodeResponse, 'refreshToken');

  const {access_token: authToken, refresh_token: refreshToken} = data;

  setAuthTokenInLocalStorage(authToken);
  setRefreshTokenInLocalStorage(refreshToken ?? '');

  return authToken;
};

const maxAge = 10_000;

// При вызове следующей функции
// maxAge время будет возвращаться тот же результат (тот же promise).
// Это нужно для того, чтобы если несколько запросов к API потребуют
// refresh-а токена, то refresh будет сделан только 1 раз.
export const refreshToken = memoize(_refreshToken, {
  maxAge,
});

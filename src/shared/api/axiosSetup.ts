import {
  clearOnLogout,
  getAuthTokenFromLocalStorage,
  refreshToken,
} from '@features/auth';
import axios, {isAxiosError} from 'axios';

export const axi = axios.create({
  // For development the proxying is used
  baseURL:
    (import.meta.env.VITE_ENABLED_API_PROXYING === 'true'
      ? ''
      : import.meta.env.VITE_API_URL) + '/v1',
});

axi.interceptors.request.use(function (config) {
  const token = getAuthTokenFromLocalStorage();
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

axi.interceptors.response.use(
  response => response,
  async (error: unknown) => {
    if (!isAxiosError(error)) {
      throw error;
    }

    const resp = error.response;
    const token = getAuthTokenFromLocalStorage();

    if (resp?.status === 401 && !token) {
      // TODO shared uses code from feature. That conflicts with FSD.
      clearOnLogout();
      window.location.reload();
    }

    const config = error?.config;

    // Add "sent" flag
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error?.response?.status === 401 && config && !config.sent) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config.sent = true;

      let newAuthToken;
      try {
        // TODO shared uses code from feature. That conflicts with FSD.
        newAuthToken = await refreshToken();
      } catch (e) {
        clearOnLogout();
        window.location.reload();
      }

      if (newAuthToken) {
        config.headers.Authorization = `Bearer ${newAuthToken}`;
        return axios(config);
      }
    }

    throw error;
  },
);

import {AxiosResponse} from 'axios';

import {validateData} from '@shared/utils';
import {getAuthTokenFromLocalStorage} from '../helpers/localStorage';
import {axi} from './axiosSetup';
import {
  v8nSchemaOfEnterPhoneResponse,
  v8nSchemaOfEnterSmsCodeResponse,
} from './backendSchemas';
import {EnterPhoneResponse, EnterSmsCodeResponse} from './backendTypes';

// Phone number is passed as a formatted string with spaces and country code
// Returns tokenToEnterOtp
export const enterPhone = async (
  phone: string,
  countryCode: string,
): Promise<string> => {
  const response = await axi.post<
    {cell_phone: string; country: string},
    AxiosResponse<EnterPhoneResponse>
  >('/auth/phone', {
    cell_phone: phone.replaceAll(' ', ''),
    country: countryCode,
  });

  const data = response.data;
  validateData(data, v8nSchemaOfEnterPhoneResponse, 'enterPhone');

  const {token, otp} = data;

  if (otp) {
    alert(`OTP: ${otp}`);
  }

  return token;
};

export interface EnterSmsCodeResult {
  authToken: string;
  refreshToken: string;
}

// Returns auth token which can be used to access data api
export const enterSmsCode = async (
  code: string,
  token: string,
): Promise<EnterSmsCodeResult> => {
  const response = await axi.post<
    {otp: string},
    AxiosResponse<EnterSmsCodeResponse>
  >(
    '/auth/validate',
    {
      otp: code,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = response.data;
  validateData(data, v8nSchemaOfEnterSmsCodeResponse, 'enterSmsCode');

  const {access_token, refresh_token} = data;

  return {
    authToken: access_token,
    refreshToken: refresh_token,
  };
};

export const logout = (): Promise<void> => {
  const authToken = getAuthTokenFromLocalStorage();

  return axi.post('/auth/logout', undefined, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

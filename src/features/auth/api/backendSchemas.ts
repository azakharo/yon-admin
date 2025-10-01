import {number, object, string} from 'yup';

import {stringOptionalNullable} from '@shared/utils';

export const v8nSchemaOfEnterPhoneResponse = object().shape({
  token: string().required(),
  expires_at: string().required(),
  otp: stringOptionalNullable,
});

export const v8nSchemaOfEnterSmsCodeResponse = object().shape({
  access_token: string().required(),
  token_type: string().required(),
  expires_in: number().integer().required(),
  refresh_token: string().required(),
});

import {InferType} from 'yup';

import {
  v8nSchemaOfEnterPhoneResponse,
  v8nSchemaOfEnterSmsCodeResponse,
} from './backendSchemas';

export type EnterPhoneResponse = InferType<
  typeof v8nSchemaOfEnterPhoneResponse
>;

export type EnterSmsCodeResponse = InferType<
  typeof v8nSchemaOfEnterSmsCodeResponse
>;

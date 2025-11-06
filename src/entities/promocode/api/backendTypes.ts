import {InferType} from 'yup';

import {
  promocodeV8nSchema,
  v8nSchemaOfGetPromocodeResponse,
} from './backendSchemas';

export type PromocodeOnBackend = InferType<typeof promocodeV8nSchema>;
export type GetPromocodesResponse = InferType<
  typeof v8nSchemaOfGetPromocodeResponse
>;

import {InferType} from 'yup';

import {
  orderV8nSchema,
  v8nSchemaOfGetUserOrdersResponse,
} from './backendSchemas';

export type OrderOnBackend = InferType<typeof orderV8nSchema>;
export type GetUserOrdersResponse = InferType<
  typeof v8nSchemaOfGetUserOrdersResponse
>;

import {InferType} from 'yup';

import {
  autoCancelV8nSchema,
  orderFullInfoV8nSchema,
  orderV8nSchema,
  stopLossV8nSchema,
  v8nSchemaOfGetUserOrdersResponse,
} from './backendSchemas';

export type OrderOnBackend = InferType<typeof orderV8nSchema>;
export type GetUserOrdersResponse = InferType<
  typeof v8nSchemaOfGetUserOrdersResponse
>;

export type AutoCancelOnBackend = InferType<typeof autoCancelV8nSchema>;
export type StopLossOnBackend = InferType<typeof stopLossV8nSchema>;
export type OrderFullInfoOnBackend = InferType<typeof orderFullInfoV8nSchema>;

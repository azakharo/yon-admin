import {InferType} from 'yup';

import {orderV8nSchema} from './backendSchemas';

export type OrderOnBackend = InferType<typeof orderV8nSchema>;

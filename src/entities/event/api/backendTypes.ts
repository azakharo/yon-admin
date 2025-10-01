import {InferType} from 'yup';

import {eventV8nSchema, v8nSchemaOfGetEventsResponse} from './backendSchemas';

export type EventOnBackend = InferType<typeof eventV8nSchema>;
export type GetEventsResponse = InferType<typeof v8nSchemaOfGetEventsResponse>;

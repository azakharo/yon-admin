import {InferType} from 'yup';

import {topicV8nSchema, v8nSchemaOfGetTopicsResponse} from './backendSchemas';

export type TopicOnBackend = InferType<typeof topicV8nSchema>;
export type GetTopicsResponse = InferType<typeof v8nSchemaOfGetTopicsResponse>;

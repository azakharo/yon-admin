import {InferType} from 'yup';

import {currentUserV8nSchema, userV8nSchema} from './backendSchemas';

export type CurrentUserOnBackend = InferType<typeof currentUserV8nSchema>;
export type UserOnBackend = InferType<typeof userV8nSchema>;

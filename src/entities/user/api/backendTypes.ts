import {InferType} from 'yup';

import {
  leaderBoardPositionV8nSchema,
  otherUserV8nSchema,
  userBalanceV8nSchema,
  userV8nSchema,
  v8nSchemaOfGetLeaderBoardPositionsResponse,
} from './backendSchemas';

export type OtherUserOnBackend = InferType<typeof otherUserV8nSchema>;
export type UserOnBackend = InferType<typeof userV8nSchema>;

export type LeaderBoardPositionOnBackend = InferType<
  typeof leaderBoardPositionV8nSchema
>;
export type GetLeaderBoardPositionsResponse = InferType<
  typeof v8nSchemaOfGetLeaderBoardPositionsResponse
>;

export type UserBalanceOnBackend = InferType<typeof userBalanceV8nSchema>;

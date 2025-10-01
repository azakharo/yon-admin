import {array, number, object, string} from 'yup';

import {paginationV8nSchema} from '@shared/api';
import {stringOptionalNullable} from '@shared/utils';

export const otherUserV8nSchema = object().shape({
  username: string().required(),
  name: string().required(),
  avatar: stringOptionalNullable,
  bio: stringOptionalNullable,
});

export const userV8nSchema = otherUserV8nSchema.shape({
  cell_phone: string().required(),
  email: stringOptionalNullable,
});

export const leaderBoardPositionV8nSchema = object().shape({
  profile: otherUserV8nSchema.required(),
  profit: number().required(),
  place: number().required(),
});

export const v8nSchemaOfGetLeaderBoardPositionsResponse =
  paginationV8nSchema.shape({
    array: array().of(leaderBoardPositionV8nSchema),
  });

export const userBalanceV8nSchema = object().shape({
  real_amount: number().integer().required(), // $ cent
  promo_amount: number().integer().required(), // $ cent
  invested: number().integer().required(), // $ cent
  unmatched: number().integer().required(), // $ cent
  withdraw: number().integer().required(), // $ cent
});

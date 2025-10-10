import {array, boolean, number, object, string} from 'yup';

import {paginationV8nSchema} from '@shared/api';
import {stringOptionalNullable} from '@shared/utils';

export const currentUserV8nSchema = object().shape({
  username: string().required(),
  name: string().required(),
  avatar: stringOptionalNullable,
  bio: stringOptionalNullable,
  cell_phone: string().required(),
  email: stringOptionalNullable,
});

export const userV8nSchema = object().shape({
  id: string().required(),
  username: string().required(),
  name: string().required(),
  cell_phone: string().required(),
  avatar: string().required().nullable(),
  email: string().required().nullable(),
  country: string().required(),
  is_verified: boolean().required(),
  is_admin: boolean().required(),
  real_funds: number().integer().required(),
  promo_funds: number().integer().required(),
});

export const v8nSchemaOfGetUsersResponse = paginationV8nSchema.shape({
  array: array().of(userV8nSchema).required(),
});

import {array, mixed, number, object, string} from 'yup';

import {PromocodeStatus, PromocodeType} from '../types';

import {paginationV8nSchema} from '@/shared/api';

export const promocodeV8nSchema = object().shape({
  code: string().required(),
  name: string().required(),
  description: string().required(),
  created_at: string().required(),
  updated_at: string().required(),
  expires_at: string().required().nullable(),
  apply_count_limit: number().integer().required(),
  usage_count_limit: number().integer().required().nullable(),
  usage_amount_limit: number().integer().required().nullable(),
  note: string().required(),
  type: string().oneOf(Object.values(PromocodeType)).required(),
  status: string().oneOf(Object.values(PromocodeStatus)).required(),
});

export const v8nSchemaOfGetPromocodeResponse = paginationV8nSchema.shape({
  array: array().of(promocodeV8nSchema),
});

export const v8nSchemaOfCreatePromocodeParams = object().shape({
  code: string().required(),
  name: string().required(),
  description: string().required(),
  expires: mixed<Date>().nullable(),
  applyCountLimit: number().integer(),
  usageCountLimit: number().integer().required().nullable(),
  usageAmountLimit: number().integer().required().nullable(),
  note: string().required(),
  type: string().oneOf(Object.values(PromocodeType)).required(),
  status: string().oneOf(Object.values(PromocodeStatus)).required(),
});

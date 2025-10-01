import {array, boolean, number, object, string} from 'yup';

import {paginationV8nSchema} from '@shared/api';
import {stringOptionalNullable} from '@shared/utils';
import {subCategoryV8nSchema} from '../../category/api/backendSchemas';

export const eventV8nSchema = object().shape({
  id: string().required(),
  name: string().required(),
  description: string().required(),
  category_name: string().required(),
  sub_categories: array().of(subCategoryV8nSchema).required(),
  start_date: string().required(),
  is_favorite: boolean().required(),
  logo_url: stringOptionalNullable,
  yes_price: number(),
  no_price: number(),
  is_live: boolean().required(),
  yes_text: stringOptionalNullable,
  no_text: stringOptionalNullable,
  trading_volume: number().integer().required(),
});

export const v8nSchemaOfGetEventsResponse = paginationV8nSchema.shape({
  array: array().of(eventV8nSchema),
});

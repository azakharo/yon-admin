import {array, boolean, object, string} from 'yup';

import {paginationV8nSchema} from '@shared/api';
import {stringOptionalNullable} from '@shared/utils';
import {subCategoryV8nSchema} from '../../category/api/backendSchemas';

export const topicV8nSchema = object().shape({
  id: string().required(),
  name: string().required(),
  logo_url: stringOptionalNullable,
  category_name: string().required(),
  sub_categories: array().of(subCategoryV8nSchema).required(),
  start_date: string().required(),
  is_live: boolean().required(),
});

export const v8nSchemaOfGetTopicsResponse = paginationV8nSchema.shape({
  array: array().of(topicV8nSchema),
});

import {InferType} from 'yup';

import {
  categoryV8nSchema,
  subCategoryV8nSchema,
  v8nSchemaOfGetCategoriesResponse,
  v8nSchemaOfGetSubCategoriesResponse,
} from './backendSchemas';

export type CategoryOnBackend = InferType<typeof categoryV8nSchema>;
export type GetCategoriesResponse = InferType<
  typeof v8nSchemaOfGetCategoriesResponse
>;

export type SubCategoryOnBackend = InferType<typeof subCategoryV8nSchema>;
export type GetSubCategoriesResponse = InferType<
  typeof v8nSchemaOfGetSubCategoriesResponse
>;

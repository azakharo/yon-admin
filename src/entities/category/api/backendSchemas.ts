import {array, object, string} from 'yup';

export const categoryV8nSchema = object().shape({
  id: string().required(),
  name: string().required(),
  description: string().required(),
  logo_url: string().required().nullable(),
  banner_url: string().required().nullable(),
});

export const v8nSchemaOfGetCategoriesResponse = array().of(categoryV8nSchema);

export const subCategoryV8nSchema = object().shape({
  id: string().required(),
  name: string().required(),
});

export const v8nSchemaOfGetSubCategoriesResponse =
  array().of(subCategoryV8nSchema);

import {axi} from '@shared/api';
import {validateData} from '@shared/utils';
import {Category, SubCategory} from '../types';
import {
  categoryV8nSchema,
  v8nSchemaOfGetCategoriesResponse,
  v8nSchemaOfGetSubCategoriesResponse,
} from './backendSchemas';
import {
  CategoryOnBackend,
  GetCategoriesResponse,
  GetSubCategoriesResponse,
} from './backendTypes';
import {mapCategoryFromBackend} from './dataMappers';

export const getCategories = async (): Promise<Category[]> => {
  const response = await axi.get<GetCategoriesResponse>('/categories');

  validateData(
    response.data,
    v8nSchemaOfGetCategoriesResponse,
    'getCategories',
  );

  return response.data?.map(item => mapCategoryFromBackend(item)) ?? [];
};

export const getSubCategories = async (
  categoryId: string,
): Promise<SubCategory[]> => {
  const response = await axi.get<GetSubCategoriesResponse>(
    `/categories/${categoryId}/subcategories`,
  );

  validateData(
    response.data,
    v8nSchemaOfGetSubCategoriesResponse,
    'getSubCategories',
  );

  return response.data ?? [];
};

export const getCategory = async (id: string): Promise<Category> => {
  const response = await axi.get<CategoryOnBackend>(`/categories/${id}`);

  validateData(response.data, categoryV8nSchema, 'getCategory');

  return mapCategoryFromBackend(response.data);
};

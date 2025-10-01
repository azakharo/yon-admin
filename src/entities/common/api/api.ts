import {axi} from '@shared/api';
import {validateData} from '@shared/utils';
import {GeoFilterOption, SortOption} from '../types';
import {
  v8nSchemaOfGetGeoFilterOptionsResponse,
  v8nSchemaOfGetSortOptionsResponse,
} from './backendSchemas';
import {
  GetGeoFilterOptionsResponse,
  GetSortOptionsResponse,
} from './backendTypes';

export const getSortOptions = async (): Promise<SortOption[]> => {
  const response = await axi.get<GetSortOptionsResponse>('/sorting');

  validateData(
    response.data,
    v8nSchemaOfGetSortOptionsResponse,
    'getSortOptions',
  );

  return response.data ?? [];
};

export const getGeoFilterOptions = async (): Promise<GeoFilterOption[]> => {
  const response = await axi.get<GetGeoFilterOptionsResponse>('/filters');

  validateData(
    response.data,
    v8nSchemaOfGetGeoFilterOptionsResponse,
    'getGeoFilterOptions',
  );

  return response.data ?? [];
};

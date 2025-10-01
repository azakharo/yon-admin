import {InferType} from 'yup';

import {
  geoFilterOptionV8nSchema,
  sortOptionV8nSchema,
  v8nSchemaOfGetGeoFilterOptionsResponse,
  v8nSchemaOfGetSortOptionsResponse,
} from './backendSchemas';

export type SortOptionOnBackend = InferType<typeof sortOptionV8nSchema>;
export type GetSortOptionsResponse = InferType<
  typeof v8nSchemaOfGetSortOptionsResponse
>;

export type GeoFilterOptionOnBackend = InferType<
  typeof geoFilterOptionV8nSchema
>;
export type GetGeoFilterOptionsResponse = InferType<
  typeof v8nSchemaOfGetGeoFilterOptionsResponse
>;

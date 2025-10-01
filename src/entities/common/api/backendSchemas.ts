import {array, object, string} from 'yup';

import {stringOptionalNullable} from '@shared/utils';

export const sortOptionV8nSchema = object().shape({
  id: string().required(),
  name: string().required(),
});

export const v8nSchemaOfGetSortOptionsResponse =
  array().of(sortOptionV8nSchema);

export const geoFilterOptionV8nSchema = sortOptionV8nSchema.shape({
  logo_url: stringOptionalNullable,
});

export const v8nSchemaOfGetGeoFilterOptionsResponse =
  array().of(sortOptionV8nSchema);

import {array, object, string} from 'yup';

import {stringOptionalNullable} from '@shared/utils';

export const bannerV8nSchema = object().shape({
  id: string().required(),
  logo_url: string().required(),
  app_url: stringOptionalNullable,
  web_url: stringOptionalNullable,
});

export const v8nSchemaOfGetBannersResponse = array().of(bannerV8nSchema);

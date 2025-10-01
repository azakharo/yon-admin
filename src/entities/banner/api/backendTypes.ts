import {InferType} from 'yup';

import {bannerV8nSchema, v8nSchemaOfGetBannersResponse} from './backendSchemas';

export type BannerOnBackend = InferType<typeof bannerV8nSchema>;
export type GetBannersResponse = InferType<
  typeof v8nSchemaOfGetBannersResponse
>;

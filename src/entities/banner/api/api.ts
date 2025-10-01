import {axi} from '@shared/api';
import {validateData} from '@shared/utils';
import {Banner} from '../types';
import {v8nSchemaOfGetBannersResponse} from './backendSchemas';
import {GetBannersResponse} from './backendTypes';
import {mapBannerFromBackend} from './dataMappers';

export const getBanners = async (): Promise<Banner[]> => {
  const response = await axi.get<GetBannersResponse>('/banners');

  validateData(response.data, v8nSchemaOfGetBannersResponse, 'getBanners');

  return response.data?.map(item => mapBannerFromBackend(item)) ?? [];
};

import isEmpty from 'lodash/isEmpty';

import {axi, GetListOutput, GetListParams} from '@shared/api';
import {validateData} from '@shared/utils';
import {Topic} from '../types';
import {v8nSchemaOfGetTopicsResponse} from './backendSchemas';
import {GetTopicsResponse} from './backendTypes';
import {mapTopicFromBackend} from './dataMappers';

export interface GetTopicsParams extends GetListParams {
  isLive?: boolean;
  isPromoted?: boolean;
  categoryId?: string;
  subCategoryIds?: string[];
  geoFilterIds?: string[];
}

export const getTopics = async ({
  page,
  pageSize,
  isLive,
  isPromoted,
  categoryId,
  subCategoryIds,
  geoFilterIds,
}: GetTopicsParams = {}): Promise<GetListOutput<Topic>> => {
  const response = await axi.get<GetTopicsResponse>('/topics', {
    params: {
      page,
      per_page: pageSize,
      live: isLive || undefined,
      promoted: isPromoted,
      category: categoryId || undefined,
      sub_category: isEmpty(subCategoryIds) ? undefined : subCategoryIds,
      geo_filter: isEmpty(geoFilterIds) ? undefined : geoFilterIds,
    },
    paramsSerializer: {
      // no brackets at all for the following query string - ?page=1&per_page=9&type_slugs[]=INV&type_slugs[]=TBP
      indexes: null,
    },
  });

  validateData(response.data, v8nSchemaOfGetTopicsResponse, 'getTopics');

  const {
    array,
    total,
    total_pages,
    page: pageFromBackend,
    per_page,
  } = response.data;
  const items = array?.map(item => mapTopicFromBackend(item)) ?? [];

  return {
    items,
    page: pageFromBackend,
    pageSize: per_page,
    total,
    totalPages: total_pages,
  };
};

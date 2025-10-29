import isEmpty from 'lodash/isEmpty';

import {
  axi,
  createBackendDateTimeString,
  GetListOutput,
  GetListParams,
} from '@shared/api';
import {TranslationDict} from '@shared/types';
import {validateData} from '@shared/utils';
import {getCategories} from '../../category';
import {Event} from '../types';
import {v8nSchemaOfGetEventsResponse} from './backendSchemas';
import {GetEventsResponse} from './backendTypes';
import {mapEventFromBackend} from './dataMappers';

export interface GetEventsParams extends GetListParams {
  isLive?: boolean;
  isComingSoon?: boolean;
  categoryId?: string;
  subCategoryIds?: string[];
  geoFilterOptionIds?: string[];
}

export const getEvents = async ({
  page,
  pageSize,
  isLive,
  isComingSoon,
  categoryId,
  subCategoryIds,
  geoFilterOptionIds,
}: GetEventsParams = {}): Promise<GetListOutput<Event>> => {
  const [response, categories] = await Promise.all([
    axi.get<GetEventsResponse>('/events', {
      params: {
        page,
        per_page: pageSize,
        live: isLive || undefined,
        coming_soon: isComingSoon,
        category: categoryId || undefined,
        sub_category: isEmpty(subCategoryIds) ? undefined : subCategoryIds,
        geo_filter: isEmpty(geoFilterOptionIds)
          ? undefined
          : geoFilterOptionIds,
      },
      paramsSerializer: {
        // no brackets at all for the following query string - ?page=1&per_page=9&type_slugs[]=INV&type_slugs[]=TBP
        indexes: null,
      },
    }),
    getCategories(),
  ]);

  validateData(response.data, v8nSchemaOfGetEventsResponse, 'getEvents');

  const {
    array,
    total,
    total_pages,
    page: pageFromBackend,
    per_page,
  } = response.data;
  const items = array?.map(item => mapEventFromBackend(item, categories)) ?? [];

  return {
    items,
    page: pageFromBackend,
    pageSize: per_page,
    total,
    totalPages: total_pages,
  };
};

export interface CreateEventParams {
  nameTrans: TranslationDict;
  descriptionTrans: TranslationDict;
  startDate: Date;
  endDate: Date;
  yesPrice: number;
  noPrice: number;
  subCategoryId: string;
  parentId: string | null;
  isPromotionNeeded: boolean;
}

export const createEvent = ({
  nameTrans,
  descriptionTrans,
  startDate,
  endDate,
  yesPrice,
  noPrice,
  subCategoryId,
  parentId,
  isPromotionNeeded,
}: CreateEventParams): Promise<void> => {
  return axi.post('/admin/events', {
    name: nameTrans,
    description: descriptionTrans,
    start_datetime: createBackendDateTimeString(startDate),
    end_datetime: createBackendDateTimeString(endDate),
    yes_cost: yesPrice,
    no_cost: noPrice,
    sub_category_id: subCategoryId,
    parent_id: parentId,
    need_promotion: isPromotionNeeded,
  });
};

import isEmpty from 'lodash/isEmpty';

import {axi, GetListOutput, GetListParams} from '@shared/api';
import {validateData} from '@shared/utils';
import {
  EventResolutionOptionStat,
  PickType,
  PortfolioEvent,
  PortfolioEventDetails,
  PortfolioSummaryStat,
} from '../types';
import {
  eventResolutionOptionStatV8nSchema,
  portfolioEventDetailsV8nSchema,
  portfolioSummaryStatV8nSchema,
  v8nSchemaOfGetPortfolioEventsResponse,
} from './backendSchemas';
import {
  EventResolutionOptionStatOnBackend,
  GetPortfolioEventsResponse,
  PortfolioEventDetailsOnBackend,
  PortfolioSummaryStatOnBackend,
} from './backendTypes';
import {
  mapEventResolutionOptionStatFromBackend,
  mapPortfolioEventDetailsFromBackend,
  mapPortfolioEventFromBackend,
  mapPortfolioSummaryStatFromBackend,
} from './dataMappers';

// The values are backend-specific
export enum StatusFilter {
  matched = 'matched',
  unmatched = 'unmatched',
  exiting = 'exiting',
  exited = 'exited',
  canceled = 'canceled',
}

// The values are backend-specific
export enum EventResolutionOption {
  yes = 'yes',
  no = 'no',
}

export interface GetPortfolioEventsParams extends GetListParams {
  categoryIds?: string[];
  statusFilter: StatusFilter;
  pickType: PickType;
}

export const getPortfolioEvents = async ({
  pickType,
  categoryIds,
  statusFilter,
  page,
  pageSize,
}: GetPortfolioEventsParams): Promise<GetListOutput<PortfolioEvent>> => {
  const response = await axi.get<GetPortfolioEventsResponse>(
    '/portfolio/events',
    {
      params: {
        picks_type: pickType,
        category: isEmpty(categoryIds) ? undefined : categoryIds,
        status: statusFilter,
        page,
        per_page: pageSize,
      },
      paramsSerializer: {
        // no brackets at all for the following query string - ?page=1&per_page=9&type_slugs[]=INV&type_slugs[]=TBP
        indexes: null,
      },
    },
  );

  validateData(
    response.data,
    v8nSchemaOfGetPortfolioEventsResponse,
    'getPortfolioEvents',
  );

  const {
    array,
    total,
    total_pages,
    page: pageFromBackend,
    per_page,
  } = response.data;
  const items = array.map(item => mapPortfolioEventFromBackend(item));

  return {
    items,
    page: pageFromBackend,
    pageSize: per_page,
    total,
    totalPages: total_pages,
  };
};

export const getPortfolioSummaryStat = async (
  pickType: PickType,
): Promise<PortfolioSummaryStat> => {
  const response = await axi.get<PortfolioSummaryStatOnBackend>(
    '/portfolio/events/summary',
    {
      params: {
        picks_type: pickType,
      },
    },
  );

  validateData(
    response.data,
    portfolioSummaryStatV8nSchema,
    'getPortfolioSummaryStat',
  );

  return mapPortfolioSummaryStatFromBackend(response.data);
};

export const getPortfolioEventDetails = async (
  eventId: string,
): Promise<PortfolioEventDetails> => {
  const response = await axi.get<PortfolioEventDetailsOnBackend>(
    `/portfolio/events/${eventId}`,
  );

  validateData(
    response.data,
    portfolioEventDetailsV8nSchema,
    'getPortfolioEventDetails',
  );

  return mapPortfolioEventDetailsFromBackend(response.data);
};

export interface GetEventResolutionOptionStatParams {
  eventId: string;
  statusFilter: StatusFilter;
  resolutionOptionFilter: EventResolutionOption;
}

export const getEventResolutionOptionStat = async ({
  eventId,
  statusFilter,
  resolutionOptionFilter,
}: GetEventResolutionOptionStatParams): Promise<EventResolutionOptionStat> => {
  const response = await axi.get<EventResolutionOptionStatOnBackend>(
    `/portfolio/events/${eventId}/stats`,
    {
      params: {
        status: statusFilter,
        side: resolutionOptionFilter,
      },
    },
  );

  validateData(
    response.data,
    eventResolutionOptionStatV8nSchema,
    'getEventResolutionOptionStat',
  );

  return mapEventResolutionOptionStatFromBackend(response.data);
};

export const addPortfolioEventToFavorites = (
  eventId: string,
): Promise<void> => {
  return axi.post('/portfolio/events/favorite', {id: eventId});
};

export const removePortfolioEventFromFavorites = (
  eventId: string,
): Promise<void> => {
  return axi.delete('/portfolio/events/favorite', {data: {id: eventId}});
};

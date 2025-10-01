import {useInfiniteQuery} from '@tanstack/react-query';

import {createInfiniteQueryCommonParams} from '@shared/utils';
import {getPortfolioEvents, GetPortfolioEventsParams} from '../api';
import {QUERY__PORTFOLIO_EVENT_INFINITE_LIST} from '../queryKeys';
import {PortfolioEvent} from '../types';

export const useGetPortfolioEventsInfinitely = (
  params: Omit<GetPortfolioEventsParams, 'page'>,
) => {
  return useInfiniteQuery({
    queryKey: [QUERY__PORTFOLIO_EVENT_INFINITE_LIST, params],
    queryFn: ({pageParam}) => {
      return getPortfolioEvents({
        page: pageParam,
        ...params,
      });
    },
    ...createInfiniteQueryCommonParams<PortfolioEvent>(),
  });
};

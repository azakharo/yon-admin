import {useInfiniteQuery} from '@tanstack/react-query';

import {createInfiniteQueryCommonParams} from '@shared/utils';
import {getEvents, GetEventsParams} from '../api';
import {QUERY__EVENT_INFINITE_LIST} from '../queryKeys';
import {Event} from '../types';

export const useGetEventsInfinitely = (
  params: Omit<GetEventsParams, 'page'>,
) => {
  return useInfiniteQuery({
    queryKey: [QUERY__EVENT_INFINITE_LIST, params],
    queryFn: ({pageParam}) => {
      return getEvents({
        page: pageParam,
        ...params,
      });
    },
    ...createInfiniteQueryCommonParams<Event>(),
  });
};

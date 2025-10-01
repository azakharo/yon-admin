import {useInfiniteQuery} from '@tanstack/react-query';

import {createInfiniteQueryCommonParams} from '@shared/utils';
import {getTopics, GetTopicsParams} from '../api';
import {QUERY__TOPIC_INFINITE_LIST} from '../queryKeys';
import {Topic} from '../types';

export const useGetTopicsInfinitely = (
  params: Omit<GetTopicsParams, 'page'>,
) => {
  return useInfiniteQuery({
    queryKey: [QUERY__TOPIC_INFINITE_LIST, params],
    queryFn: ({pageParam}) => {
      return getTopics({
        page: pageParam,
        ...params,
      });
    },
    ...createInfiniteQueryCommonParams<Topic>(),
  });
};

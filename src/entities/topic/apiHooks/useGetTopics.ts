import {useQuery} from '@tanstack/react-query';

import {GetListOutput} from '@shared/api';
import {getTopics, GetTopicsParams} from '../api';
import {QUERY__TOPICS} from '../queryKeys';
import {Topic} from '../types';

import {QueryOptionsForList} from '@/shared/api';

export const useGetTopics = <SelectedData = GetListOutput<Topic>>(
  params?: GetTopicsParams,
  options?: QueryOptionsForList<Topic, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__TOPICS, params],
    queryFn: () => getTopics(params),
    ...options,
  });
};

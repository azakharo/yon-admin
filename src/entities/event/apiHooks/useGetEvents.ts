import {useQuery} from '@tanstack/react-query';

import {GetListOutput} from '@shared/api';
import {getEvents, GetEventsParams} from '../api';
import {QUERY__EVENTS} from '../queryKeys';
import {Event} from '../types';

import {QueryOptionsForList} from '@/shared/api';

export const useGetEvents = <SelectedData = GetListOutput<Event>>(
  params?: GetEventsParams,
  options?: QueryOptionsForList<Event, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__EVENTS, params],
    queryFn: () => getEvents(params),
    ...options,
  });
};

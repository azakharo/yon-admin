import {useQuery} from '@tanstack/react-query';

import {getEvent} from '../api';
import {QUERY__EVENT} from '../queryKeys';
import {Event} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetEvent = <SelectedData = Event>(
  id: string,
  options?: QueryOptionsForOne<Event, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__EVENT, id],
    queryFn: () => getEvent(id),
    ...options,
  });
};

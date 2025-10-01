import {useQuery} from '@tanstack/react-query';

import {
  getEventResolutionOptionStat,
  GetEventResolutionOptionStatParams,
} from '../api';
import {QUERY__EVENT_RESOLUTION_OPTION_STAT} from '../queryKeys';
import {EventResolutionOptionStat} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetEventResolutionOptionStat = <
  SelectedData = EventResolutionOptionStat,
>(
  params: GetEventResolutionOptionStatParams,
  options?: QueryOptionsForOne<EventResolutionOptionStat, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__EVENT_RESOLUTION_OPTION_STAT, params],
    queryFn: () => getEventResolutionOptionStat(params),
    ...options,
  });
};

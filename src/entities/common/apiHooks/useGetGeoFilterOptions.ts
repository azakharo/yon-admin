import {useQuery} from '@tanstack/react-query';

import {getGeoFilterOptions} from '../api';
import {QUERY__GEO_FILTER_OPTIONS} from '../queryKeys';
import {GeoFilterOption} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetGeoFilterOptions = <SelectedData = GeoFilterOption[]>(
  options?: QueryOptionsForOne<GeoFilterOption[], SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__GEO_FILTER_OPTIONS],
    queryFn: () => getGeoFilterOptions(),
    ...options,
  });
};

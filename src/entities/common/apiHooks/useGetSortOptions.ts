import {useQuery} from '@tanstack/react-query';

import {getSortOptions} from '../api';
import {QUERY__SORT_OPTIONS} from '../queryKeys';
import {SortOption} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetSortOptions = <SelectedData = SortOption[]>(
  options?: QueryOptionsForOne<SortOption[], SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__SORT_OPTIONS],
    queryFn: () => getSortOptions(),
    ...options,
  });
};

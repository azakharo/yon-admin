import {useQuery} from '@tanstack/react-query';

import {getCategories} from '../api';
import {QUERY__CATEGORIES} from '../queryKeys';
import {Category} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetCategories = <SelectedData = Category[]>(
  options?: QueryOptionsForOne<Category[], SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__CATEGORIES],
    queryFn: () => getCategories(),
    ...options,
  });
};

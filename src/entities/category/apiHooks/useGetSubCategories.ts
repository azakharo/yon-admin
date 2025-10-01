import {useQuery} from '@tanstack/react-query';

import {getSubCategories} from '../api';
import {QUERY__SUB_CATEGORIES} from '../queryKeys';
import {SubCategory} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetSubCategories = <SelectedData = SubCategory[]>(
  categoryId: string,
  options?: QueryOptionsForOne<SubCategory[], SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__SUB_CATEGORIES, categoryId],
    queryFn: () => getSubCategories(categoryId),
    ...options,
  });
};

import {useQuery} from '@tanstack/react-query';

import {getCategory} from '../api';
import {QUERY__CATEGORY} from '../queryKeys';
import {Category} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetCategory = <SelectedData = Category>(
  id: string,
  options?: QueryOptionsForOne<Category, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__CATEGORY, id],
    queryFn: () => getCategory(id),
    ...options,
  });
};

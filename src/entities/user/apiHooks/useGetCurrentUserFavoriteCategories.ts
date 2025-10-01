import {useQuery} from '@tanstack/react-query';

import {Category} from '../../category';
import {getCurrentUserFavoriteCategories} from '../api';
import {QUERY__FAVORITE_CATEGORIES} from '../queryKeys';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetCurrentUserFavoriteCategories = <SelectedData = Category[]>(
  options?: QueryOptionsForOne<Category[], SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__FAVORITE_CATEGORIES],
    queryFn: () => getCurrentUserFavoriteCategories(),
    ...options,
  });
};

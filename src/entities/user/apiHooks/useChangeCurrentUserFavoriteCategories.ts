import {useMutation, useQueryClient} from '@tanstack/react-query';

import {changeCurrentUserFavoriteCategories} from '../api';
import {QUERY__FAVORITE_CATEGORIES} from '../queryKeys';

export const useChangeCurrentUserFavoriteCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryIds: string[]) =>
      changeCurrentUserFavoriteCategories(categoryIds),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY__FAVORITE_CATEGORIES],
      });
    },
  });
};

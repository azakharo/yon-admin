import {useMutation, useQueryClient} from '@tanstack/react-query';

import {createPromocode} from '../api';
import {QUERY__PROMOCODES} from '../queryKeys';
import {CreatePromocodeParams} from '../types';

export const useCreatePromocode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreatePromocodeParams) => createPromocode(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY__PROMOCODES],
      });
    },
  });
};

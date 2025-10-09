import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {topUpBalance, TopUpBalanceParams} from '../api';
import {QUERY__USERS} from '../queryKeys';

export const useTopUpBalance = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();

  return useMutation({
    mutationFn: (params: TopUpBalanceParams) => topUpBalance(params),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY__USERS],
      }),
    onError: error => {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    },
  });
};

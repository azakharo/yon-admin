import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {setAdmin} from '../api';
import {QUERY__USERS} from '../queryKeys';

export const useSetAdmin = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();

  return useMutation({
    mutationFn: (userId: string) => setAdmin(userId),
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

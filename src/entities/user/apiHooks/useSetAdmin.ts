import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {setAdmin, SetAdminParams} from '../api';
import {QUERY__USERS} from '../queryKeys';

export const useSetAdmin = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();

  return useMutation({
    mutationFn: (params: SetAdminParams) => setAdmin(params),
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

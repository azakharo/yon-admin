import {useMutation, useQueryClient} from '@tanstack/react-query';

import {createEvent, CreateEventParams} from '../api';
import {QUERY__EVENTS} from '../queryKeys';

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateEventParams) => createEvent(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY__EVENTS],
      });
    },
  });
};

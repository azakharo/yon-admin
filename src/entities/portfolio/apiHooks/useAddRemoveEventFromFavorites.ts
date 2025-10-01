import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {createInfiniteQueryUpdater} from '@shared/utils';
import {Event} from '../../event';
import {QUERY__EVENT_INFINITE_LIST} from '../../event/queryKeys';
import {
  addPortfolioEventToFavorites,
  removePortfolioEventFromFavorites,
} from '../api';
import {QUERY__PORTFOLIO_EVENT_INFINITE_LIST} from '../queryKeys';
import {PortfolioEvent} from '../types';

interface Params {
  eventId: string;
  isFavorite: boolean;
}

const updatePortfolioEvent = (item: PortfolioEvent, params: Params) => {
  if (item.id === params.eventId) {
    return {...item, isFavorite: !item.isFavorite};
  }

  return item;
};

const updateEvent = (item: Event, params: Params) => {
  if (item.id === params.eventId) {
    return {...item, isFavorite: !item.isFavorite};
  }

  return item;
};

export const useAddRemoveEventFromFavorites = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();

  return useMutation({
    mutationFn: ({eventId, isFavorite}: Params) =>
      isFavorite
        ? removePortfolioEventFromFavorites(eventId)
        : addPortfolioEventToFavorites(eventId),
    onSuccess: (_, params) => {
      queryClient.setQueriesData(
        {queryKey: [QUERY__PORTFOLIO_EVENT_INFINITE_LIST]},
        createInfiniteQueryUpdater<PortfolioEvent, Params>(
          updatePortfolioEvent,
          params,
        ),
      );

      queryClient.setQueriesData(
        {queryKey: [QUERY__EVENT_INFINITE_LIST]},
        createInfiniteQueryUpdater<Event, Params>(updateEvent, params),
      );
    },
    onError: error => {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    },
  });
};

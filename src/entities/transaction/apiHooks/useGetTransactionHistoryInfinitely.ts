import {useInfiniteQuery} from '@tanstack/react-query';

import {createInfiniteQueryCommonParams} from '@shared/utils';
import {getTransactionHistory, GetTransactionHistoryParams} from '../api';
import {QUERY__TRANSACTION_HISTORY} from '../queryKeys';
import {Transaction} from '../types';

export const useGetTransactionHistoryInfinitely = (
  params: Omit<GetTransactionHistoryParams, 'page'>,
) => {
  return useInfiniteQuery({
    queryKey: [QUERY__TRANSACTION_HISTORY, params],
    queryFn: ({pageParam}) => {
      return getTransactionHistory({
        page: pageParam,
        ...params,
      });
    },
    ...createInfiniteQueryCommonParams<Transaction>(),
  });
};

import {useQuery} from '@tanstack/react-query';

import {GetListOutput} from '@shared/api';
import {getTransactionHistory, GetTransactionHistoryParams} from '../api';
import {QUERY__PROMO_MONEY_TRANSACTIONS} from '../queryKeys';
import {Transaction} from '../types';

import {QueryOptionsForList} from '@/shared/api';

export const useGetPromoMoneyTransactions = <
  SelectedData = GetListOutput<Transaction>,
>(
  params: GetTransactionHistoryParams,
  options?: QueryOptionsForList<Transaction, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__PROMO_MONEY_TRANSACTIONS, params],
    queryFn: () => getTransactionHistory(params),
    ...options,
  });
};

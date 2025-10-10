import {useQuery} from '@tanstack/react-query';

import {getUserOrders, GetUserOrdersParams} from '../api';
import {QUERY__USER_ORDERS} from '../queryKeys';
import {Order} from '../types';

import {GetListOutput, QueryOptionsForList} from '@/shared/api';

export const useGetUserOrders = <SelectedData = GetListOutput<Order>>(
  params: GetUserOrdersParams,
  options?: QueryOptionsForList<Order, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__USER_ORDERS, params],
    queryFn: () => getUserOrders(params),
    ...options,
  });
};

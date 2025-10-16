import {useQuery} from '@tanstack/react-query';

import {getOrders, GetOrdersParams} from '../api';
import {QUERY__ORDERS} from '../queryKeys';
import {Order} from '../types';

import {GetListOutput, QueryOptionsForList} from '@/shared/api';

export const useGetOrders = <SelectedData = GetListOutput<Order>>(
  params: GetOrdersParams,
  options?: QueryOptionsForList<Order, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__ORDERS, params],
    queryFn: () => getOrders(params),
    ...options,
  });
};

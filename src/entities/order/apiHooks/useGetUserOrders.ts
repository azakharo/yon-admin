import {useQuery} from '@tanstack/react-query';

import {getUserOrders} from '../api';
import {QUERY__USER_ORDERS} from '../queryKeys';
import {Order} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetUserOrders = <SelectedData = Order[]>(
  userId: string,
  options?: QueryOptionsForOne<Order[], SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__USER_ORDERS, userId],
    queryFn: () => getUserOrders(userId),
    ...options,
  });
};

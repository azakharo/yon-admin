import {useQuery} from '@tanstack/react-query';

import {getOrderFullInfo} from '../api';
import {QUERY__ORDER_FULL_INFO} from '../queryKeys';
import {OrderFullInfo} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetOrderFullInfo = <SelectedData = OrderFullInfo>(
  orderId: string,
  options?: QueryOptionsForOne<OrderFullInfo, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__ORDER_FULL_INFO, orderId],
    queryFn: () => getOrderFullInfo(orderId),
    ...options,
  });
};

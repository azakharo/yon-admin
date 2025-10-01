import {useQuery} from '@tanstack/react-query';

import {getCurrentUserBalance} from '../api';
import {QUERY__CURRENT_USER_BALANCE} from '../queryKeys';
import {UserBalance} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetCurrentUserBalance = <SelectedData = UserBalance>(
  options?: QueryOptionsForOne<UserBalance, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__CURRENT_USER_BALANCE],
    queryFn: () => getCurrentUserBalance(),
    ...options,
  });
};

import {useQuery} from '@tanstack/react-query';

import {getUsers} from '../api';
import {QUERY__USERS} from '../queryKeys';
import {User} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetUsers = <SelectedData = User[]>(
  options?: QueryOptionsForOne<User[], SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__USERS],
    queryFn: () => getUsers(),
    ...options,
  });
};

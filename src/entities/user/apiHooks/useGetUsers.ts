import {useQuery} from '@tanstack/react-query';

import {getUsers, GetUsersParams} from '../api';
import {QUERY__USERS} from '../queryKeys';
import {User} from '../types';

import {GetListOutput, QueryOptionsForList} from '@/shared/api';

export const useGetUsers = <SelectedData = GetListOutput<User>>(
  params?: GetUsersParams,
  options?: QueryOptionsForList<User, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__USERS, params],
    queryFn: () => getUsers(params),
    ...options,
  });
};

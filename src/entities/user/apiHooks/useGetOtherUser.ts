import {useQuery} from '@tanstack/react-query';

import {getOtherUser} from '../api';
import {QUERY__OTHER_USER} from '../queryKeys';
import {OtherUser} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetOtherUser = <SelectedData = OtherUser>(
  username: string,
  options?: QueryOptionsForOne<OtherUser, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__OTHER_USER, username],
    queryFn: () => getOtherUser(username),
    ...options,
  });
};

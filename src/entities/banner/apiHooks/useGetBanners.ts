import {useQuery} from '@tanstack/react-query';

import {getBanners} from '../api';
import {QUERY__BANNERS} from '../queryKeys';
import {Banner} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetBanners = <SelectedData = Banner[]>(
  options?: QueryOptionsForOne<Banner[], SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__BANNERS],
    queryFn: () => getBanners(),
    ...options,
  });
};

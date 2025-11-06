import {useQuery} from '@tanstack/react-query';

import {GetListOutput} from '@shared/api';
import {getPromocodes, GetPromocodesParams} from '../api';
import {QUERY__PROMOCODES} from '../queryKeys';
import {Promocode} from '../types';

import {QueryOptionsForList} from '@/shared/api';

export const useGetPromocodes = <SelectedData = GetListOutput<Promocode>>(
  params?: GetPromocodesParams,
  options?: QueryOptionsForList<Promocode, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__PROMOCODES, params],
    queryFn: () => getPromocodes(params),
    ...options,
  });
};

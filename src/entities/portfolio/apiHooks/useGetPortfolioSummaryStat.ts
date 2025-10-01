import {useQuery} from '@tanstack/react-query';

import {getPortfolioSummaryStat} from '../api';
import {QUERY__PORTFOLIO_SUMMARY_STAT} from '../queryKeys';
import {PickType, PortfolioSummaryStat} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetPortfolioSummaryStat = <SelectedData = PortfolioSummaryStat>(
  pickType: PickType,
  options?: QueryOptionsForOne<PortfolioSummaryStat, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__PORTFOLIO_SUMMARY_STAT, pickType],
    queryFn: () => getPortfolioSummaryStat(pickType),
    ...options,
  });
};

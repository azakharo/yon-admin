import {useQuery} from '@tanstack/react-query';

import {getPortfolioEventDetails} from '../api';
import {QUERY__PORTFOLIO_EVENT_DETAILS} from '../queryKeys';
import {PortfolioEventDetails} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetPortfolioEventDetails = <
  SelectedData = PortfolioEventDetails,
>(
  eventId: string,
  options?: QueryOptionsForOne<PortfolioEventDetails, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__PORTFOLIO_EVENT_DETAILS, eventId],
    queryFn: () => getPortfolioEventDetails(eventId),
    ...options,
  });
};

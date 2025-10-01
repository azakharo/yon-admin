import {useQuery} from '@tanstack/react-query';

import {
  getLeaderBoardPositionOfCurrentUser,
  GetLeaderBoardPositionOfCurrentUserParams,
} from '../api';
import {QUERY__LEADERBOARD_POSITION_OF_CURRENT_USER} from '../queryKeys';
import {LeaderBoardPosition} from '../types';

import {QueryOptionsForOne} from '@/shared/api';

export const useGetLeaderBoardPositionOfCurrentUser = <
  SelectedData = LeaderBoardPosition,
>(
  params?: GetLeaderBoardPositionOfCurrentUserParams,
  options?: QueryOptionsForOne<LeaderBoardPosition, SelectedData>,
) => {
  return useQuery({
    queryKey: [QUERY__LEADERBOARD_POSITION_OF_CURRENT_USER, params],
    queryFn: () => getLeaderBoardPositionOfCurrentUser(params),
    ...options,
  });
};

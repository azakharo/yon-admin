import {useInfiniteQuery} from '@tanstack/react-query';

import {createInfiniteQueryCommonParams} from '@shared/utils';
import {getLeaderBoardPositions, GetLeaderBoardPositionsParams} from '../api';
import {QUERY__LEADERBOARD_POSITIONS_INFINITE} from '../queryKeys';
import {LeaderBoardPosition} from '../types';

type Params = Omit<GetLeaderBoardPositionsParams, 'page'> | undefined;

export const useGetLeaderBoardPositionsInfinitely = (params: Params) => {
  return useInfiniteQuery({
    queryKey: [QUERY__LEADERBOARD_POSITIONS_INFINITE, params],
    queryFn: ({pageParam}) => {
      return getLeaderBoardPositions({
        page: pageParam,
        ...params,
      });
    },
    ...createInfiniteQueryCommonParams<LeaderBoardPosition>(),
  });
};

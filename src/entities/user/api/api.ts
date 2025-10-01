import {
  LeaderBoardPosition,
  OtherUser,
  User,
  UserBalance,
} from '@entities/user';
import {axi, GetListOutput, GetListParams} from '@shared/api';
import {validateData} from '@shared/utils';
import {Category} from '../../category';
import {v8nSchemaOfGetCategoriesResponse} from '../../category/api/backendSchemas';
import {GetCategoriesResponse} from '../../category/api/backendTypes';
import {mapCategoryFromBackend} from '../../category/api/dataMappers';
import {
  leaderBoardPositionV8nSchema,
  otherUserV8nSchema,
  userBalanceV8nSchema,
  userV8nSchema,
  v8nSchemaOfGetLeaderBoardPositionsResponse,
} from './backendSchemas';
import {
  GetLeaderBoardPositionsResponse,
  LeaderBoardPositionOnBackend,
  OtherUserOnBackend,
  UserBalanceOnBackend,
  UserOnBackend,
} from './backendTypes';
import {
  mapLeaderBoardPositionFromBackend,
  mapOtherUserFromBackend,
  mapUserBalanceFromBackend,
  mapUserFromBackend,
} from './dataMappers';

export const getCurrentUser = async (): Promise<User> => {
  const response = await axi.get<UserOnBackend>('/profile/current_user');

  validateData(response.data, userV8nSchema, 'getCurrentUser');

  return mapUserFromBackend(response.data);
};

export const getCurrentUserFavoriteCategories = async (): Promise<
  Category[]
> => {
  const response = await axi.get<GetCategoriesResponse>(
    '/categories/current_user/favorite',
  );

  validateData(
    response.data,
    v8nSchemaOfGetCategoriesResponse,
    'getCurrentUserFavoriteCategories',
  );

  return response.data?.map(item => mapCategoryFromBackend(item)) ?? [];
};

export const changeCurrentUserFavoriteCategories = (
  categoryIds: string[],
): Promise<void> =>
  axi.put(
    '/categories/current_user/favorite',
    categoryIds.map(catId => ({
      id: catId,
    })),
  );

export const getOtherUser = async (username: string): Promise<OtherUser> => {
  const response = await axi.get<OtherUserOnBackend>(`/profile/${username}`);

  validateData(response.data, otherUserV8nSchema, 'getOtherUser');

  return mapOtherUserFromBackend(response.data);
};

// The following values are backend-specific
export enum LeaderBoardTimePeriod {
  allTime = 'all_time',
  lastWeek = 'weekly',
  lastMonth = 'monthly',
}

export interface GetLeaderBoardPositionsParams extends GetListParams {
  timePeriod?: LeaderBoardTimePeriod;
}

export const getLeaderBoardPositions = async ({
  page,
  pageSize,
  timePeriod,
}: GetLeaderBoardPositionsParams = {}): Promise<
  GetListOutput<LeaderBoardPosition>
> => {
  const response = await axi.get<GetLeaderBoardPositionsResponse>(
    '/profile/leaderboard',
    {
      params: {
        page,
        per_page: pageSize,
        type: timePeriod,
      },
    },
  );

  validateData(
    response.data,
    v8nSchemaOfGetLeaderBoardPositionsResponse,
    'getLeaderBoardPositions',
  );

  const {
    array,
    total,
    total_pages,
    page: pageFromBackend,
    per_page,
  } = response.data;
  const items =
    array?.map(item => mapLeaderBoardPositionFromBackend(item)) ?? [];

  return {
    items,
    page: pageFromBackend,
    pageSize: per_page,
    total,
    totalPages: total_pages,
  };
};

export interface GetLeaderBoardPositionOfCurrentUserParams {
  timePeriod?: LeaderBoardTimePeriod;
}

export const getLeaderBoardPositionOfCurrentUser = async ({
  timePeriod,
}: GetLeaderBoardPositionOfCurrentUserParams = {}): Promise<LeaderBoardPosition> => {
  const response = await axi.get<LeaderBoardPositionOnBackend>(
    '/profile/current_user/leaderboard/position',
    {
      params: {
        type: timePeriod,
      },
    },
  );

  validateData(
    response.data,
    leaderBoardPositionV8nSchema,
    'getLeaderBoardPositionOfCurrentUser',
  );

  return mapLeaderBoardPositionFromBackend(response.data);
};

export const getCurrentUserBalance = async (): Promise<UserBalance> => {
  const response = await axi.get<UserBalanceOnBackend>('/balance');

  validateData(response.data, userBalanceV8nSchema, 'getCurrentUserBalance');

  return mapUserBalanceFromBackend(response.data);
};

import {CurrentUser, User} from '@entities/user';
import {axi, GetListOutput, GetListParams} from '@shared/api';
import {currencyValueDivider} from '@shared/constants';
import {validateData} from '@shared/utils';
import {
  currentUserV8nSchema,
  v8nSchemaOfGetUsersResponse,
} from './backendSchemas';
import {CurrentUserOnBackend, GetUsersResponse} from './backendTypes';
import {mapCurrentUserFromBackend, mapUserFromBackend} from './dataMappers';

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const response = await axi.get<CurrentUserOnBackend>('/profile/current_user');

  validateData(response.data, currentUserV8nSchema, 'getCurrentUser');

  return mapCurrentUserFromBackend(response.data);
};

export type GetUsersParams = GetListParams;

export const getUsers = async ({page, pageSize}: GetUsersParams = {}): Promise<
  GetListOutput<User>
> => {
  const response = await axi.get<GetUsersResponse>('/admin/users', {
    params: {
      page,
      per_page: pageSize,
    },
  });

  const data = response.data;

  validateData(data, v8nSchemaOfGetUsersResponse, 'getUsers');

  const {
    total,
    total_pages,
    array,
    page: pageFromBackend,
    per_page: pageSizeFromBackend,
  } = data;

  return {
    page: pageFromBackend,
    pageSize: pageSizeFromBackend,
    total,
    totalPages: total_pages,
    items: array.map(item => mapUserFromBackend(item)),
  };
};

export const setAdmin = (userId: string): Promise<void> => {
  return axi.put(`/admin/users/${userId}/grant_admin`);
};

export interface TopUpBalanceParams {
  userId: string;
  dollars: number;
}

export const topUpBalance = ({
  userId,
  dollars,
}: TopUpBalanceParams): Promise<void> => {
  return axi.post(`/admin/users/${userId}/top_up`, {
    amount: dollars * currencyValueDivider,
  });
};

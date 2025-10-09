import {CurrentUser, User} from '@entities/user';
import {axi} from '@shared/api';
import {currencyValueDivider} from '@shared/constants';
import {validateData} from '@shared/utils';
import {
  currentUserV8nSchema,
  v8nSchemaOfGetUsersResponse,
} from './backendSchemas';
import {CurrentUserOnBackend, UserOnBackend} from './backendTypes';
import {mapCurrentUserFromBackend, mapUserFromBackend} from './dataMappers';

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const response = await axi.get<CurrentUserOnBackend>('/profile/current_user');

  validateData(response.data, currentUserV8nSchema, 'getCurrentUser');

  return mapCurrentUserFromBackend(response.data);
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axi.get<UserOnBackend[]>('/admin/users');

  validateData(response.data, v8nSchemaOfGetUsersResponse, 'getUsers');

  return response.data.map(item => mapUserFromBackend(item));
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

import {axi, GetListOutput, GetListParams} from '@shared/api';
import {validateData} from '@shared/utils';
import {Order} from '../types';
import {v8nSchemaOfGetUserOrdersResponse} from './backendSchemas';
import {GetUserOrdersResponse} from './backendTypes';
import {mapOrderFromBackend} from './dataMappers';

export interface GetUserOrdersParams extends GetListParams {
  userId: string;
}

export const getUserOrders = async ({
  userId,
  page,
  pageSize,
}: GetUserOrdersParams): Promise<GetListOutput<Order>> => {
  const response = await axi.get<GetUserOrdersResponse>(
    `/admin/users/${userId}/orders`,
    {
      params: {
        page,
        per_page: pageSize,
      },
    },
  );

  const data = response.data;

  validateData(
    response.data,
    v8nSchemaOfGetUserOrdersResponse,
    'getUserOrders',
  );

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
    items: array.map(item => mapOrderFromBackend(item)),
  };
};

import {axi, GetListOutput, GetListParams} from '@shared/api';
import {validateData} from '@shared/utils';
import {Order, OrderFullInfo} from '../types';
import {
  orderFullInfoV8nSchema,
  v8nSchemaOfGetUserOrdersResponse,
} from './backendSchemas';
import {GetUserOrdersResponse, OrderFullInfoOnBackend} from './backendTypes';
import {mapOrderFromBackend, mapOrderFullInfoFromBackend} from './dataMappers';

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

  validateData(data, v8nSchemaOfGetUserOrdersResponse, 'getUserOrders');

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

export const getOrderFullInfo = async (
  orderId: string,
): Promise<OrderFullInfo> => {
  const response = await axi.get<OrderFullInfoOnBackend>(
    `/admin/orders/${orderId}`,
  );

  const data = response.data;

  validateData(data, orderFullInfoV8nSchema, 'getOrderFullInfo');

  return mapOrderFullInfoFromBackend(data);
};

import {axi} from '@shared/api';
import {validateData} from '@shared/utils';
import {Order} from '../types';
import {v8nSchemaOfGetUserOrdersResponse} from './backendSchemas';
import {OrderOnBackend} from './backendTypes';
import {mapOrderFromBackend} from './dataMappers';

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const response = await axi.get<OrderOnBackend[]>(
    `/admin/users/${userId}/orders`,
  );

  validateData(
    response.data,
    v8nSchemaOfGetUserOrdersResponse,
    'getUserOrders',
  );

  return response.data.map(item => mapOrderFromBackend(item));
};

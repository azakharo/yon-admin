import {axi, GetListOutput, GetListParams} from '@shared/api';
import {validateData} from '@shared/utils';
import {CreatePromocodeParams, Promocode} from '../types';
import {v8nSchemaOfGetPromocodeResponse} from './backendSchemas';
import {GetPromocodesResponse} from './backendTypes';
import {mapPromocodeFromBackend} from './dataMappers';

export type GetPromocodesParams = GetListParams;

export const getPromocodes = async ({
  page,
  pageSize,
}: GetPromocodesParams = {}): Promise<GetListOutput<Promocode>> => {
  const response = await axi.get<GetPromocodesResponse>(
    '/admin/profile/promo-codes',
    {
      params: {
        page,
        per_page: pageSize,
      },
    },
  );

  validateData(response.data, v8nSchemaOfGetPromocodeResponse, 'getPromocodes');

  const {
    array,
    total,
    total_pages,
    page: pageFromBackend,
    per_page,
  } = response.data;
  const items = array?.map(item => mapPromocodeFromBackend(item)) ?? [];

  return {
    items,
    page: pageFromBackend,
    pageSize: per_page,
    total,
    totalPages: total_pages,
  };
};

export const createPromocode = ({
  code,
  name,
  description,
  expires,
  applyCountLimit,
  usageCountLimit,
  usageAmountLimit,
  note,
  type,
  status,
}: CreatePromocodeParams): Promise<void> => {
  return axi.post('/admin/profile/promo-codes', {
    name,
    description,
    code,
    type,
    note,
    status,
    expires_at: expires?.toISOString(),
    apply_count_limit: applyCountLimit,
    usage_count_limit: usageCountLimit,
    usage_amount_limit: usageAmountLimit,
  });
};

import {axi, GetListOutput, GetListParams} from '@shared/api';
import {validateData} from '@shared/utils';
import {Transaction} from '../types';
import {v8nSchemaOfGetTransactionHistoryResponse} from './backendSchemas';
import {GetTransactionHistoryResponse} from './backendTypes';
import {mapTransactionFromBackend} from './dataMappers';

// The values are backend-specific
export enum TransactionTypeFilter {
  all = 'all',
  credit = 'credit',
  debit = 'debit',
}

export interface GetTransactionHistoryParams extends GetListParams {
  typeFilter: TransactionTypeFilter;
}

export const getTransactionHistory = async ({
  typeFilter,
  page,
  pageSize,
}: GetTransactionHistoryParams): Promise<GetListOutput<Transaction>> => {
  const response = await axi.get<GetTransactionHistoryResponse>(
    '/balance/transactions/account',
    {
      params: {
        filter: typeFilter,
        page,
        per_page: pageSize,
      },
    },
  );

  validateData(
    response.data,
    v8nSchemaOfGetTransactionHistoryResponse,
    'getTransactionHistory',
  );

  const {
    array,
    total,
    total_pages,
    page: pageFromBackend,
    per_page,
  } = response.data;
  const items = array?.map(item => mapTransactionFromBackend(item)) ?? [];

  return {
    items,
    page: pageFromBackend,
    pageSize: per_page,
    total,
    totalPages: total_pages,
  };
};

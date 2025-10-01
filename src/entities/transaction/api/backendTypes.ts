import {InferType} from 'yup';

import {
  transactionV8nSchema,
  v8nSchemaOfGetTransactionHistoryResponse,
} from './backendSchemas';

export type TransactionOnBackend = InferType<typeof transactionV8nSchema>;
export type GetTransactionHistoryResponse = InferType<
  typeof v8nSchemaOfGetTransactionHistoryResponse
>;

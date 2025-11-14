import {array, number, object, string} from 'yup';

import {paginationV8nSchema} from '@shared/api';
import {stringOptionalNullable} from '@shared/utils';

export const transactionV8nSchema = object().shape({
  id: string().required(),
  real_amount: number().integer().required(),
  promo_amount: number().integer().required(),
  created_at: string().required(),
  related_entity: string().oneOf(['order', 'payment']).nullable(),
  related_entity_id: stringOptionalNullable,
  label: stringOptionalNullable,
  payment_type: string().oneOf(['deposit', 'withdrawals']).nullable(),
  meta: array().of(string().required()),
});

export const v8nSchemaOfGetTransactionHistoryResponse =
  paginationV8nSchema.shape({
    array: array().of(transactionV8nSchema),
  });

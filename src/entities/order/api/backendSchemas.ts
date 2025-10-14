import {array, number, object, string} from 'yup';

import {paginationV8nSchema} from '@shared/api';
import {
  AutoCancelStatus,
  ChoiceVariant,
  MarketType,
  OrderType,
  TriggerType,
} from '../types';

export const orderV8nSchema = object().shape({
  id: string().required(),
  start_date: string().required(),
  end_date: string().required(),
  type: string().oneOf(Object.values(OrderType)).required(),
  side: string().oneOf(Object.values(ChoiceVariant)).required(),
  event_id: string().required(),
  requested_items_quantity: number().integer().required(),
  requested_max_inv: number().integer().required(),
  price: number().integer().nullable(),
  slippage: number().integer().nullable(),
  matching: string().oneOf(Object.values(MarketType)).required().nullable(),
});

export const v8nSchemaOfGetUserOrdersResponse = paginationV8nSchema.shape({
  array: array().of(orderV8nSchema).required(),
});

export const autoCancelV8nSchema = object().shape({
  order_id: string().required(),
  timeout_at: string().required(),
  status: string().oneOf(Object.values(AutoCancelStatus)).required(),
});

export const stopLossV8nSchema = object().shape({
  order_id: string().required(),
  type: string().oneOf(Object.values(TriggerType)).required(),
  price: number().integer().required(),
  status: string().oneOf(Object.values(AutoCancelStatus)).required(),
});

export const orderFullInfoV8nSchema = object().shape({
  id: string().required(),
  start_date: string().required(),
  end_date: string().required(),
  type: string().oneOf(Object.values(OrderType)).required(),
  side: string().oneOf(Object.values(ChoiceVariant)).required(),
  requested_items_quantity: number().integer().nullable(),
  executed_items_quantity: number().integer().nullable(),
  requested_max_inv: number().integer().nullable(),
  executed_max_inv: number().integer().nullable(),
  investment: number().integer().nullable(),
  invested: number().integer().nullable(),
  current_value: number().integer().nullable(),
  live_profit: number().integer().nullable(),
  auto_cancel: autoCancelV8nSchema.nullable(),
  stop_loss: stopLossV8nSchema.nullable(),
  take_profit: stopLossV8nSchema.nullable(),
  price: number().integer().nullable(),
  slippage: number().integer().nullable(),
  selling_price: number().integer().nullable(),
  potential_profit: number().integer().nullable(),
  avg_exit_price: number().integer().nullable(),
  unfilled: number().integer().nullable(),
  matched_quantity: number().integer().nullable(),
  matching: string().oneOf(Object.values(MarketType)).nullable(),
  profit: number().integer().nullable(),
});

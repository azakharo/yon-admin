import {array, number, object, string} from 'yup';

import {ChoiceVariant, MarketType, OrderType} from '../types';

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

export const v8nSchemaOfGetUserOrdersResponse = array().of(orderV8nSchema);

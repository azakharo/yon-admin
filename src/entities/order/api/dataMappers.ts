import isNil from 'lodash/isNil';

import {getBackendCurrencyValue, getDateFromIsoString} from '@shared/api';
import {AutoCancel, Order, OrderFullInfo, StopLoss} from '../types';
import {
  AutoCancelOnBackend,
  OrderFullInfoOnBackend,
  OrderOnBackend,
  StopLossOnBackend,
} from './backendTypes';

export const mapAutoCancelFromBackend = ({
  order_id,
  timeout_at,
  status,
}: AutoCancelOnBackend): AutoCancel => ({
  orderId: order_id,
  timeoutAt: getDateFromIsoString(timeout_at),
  status,
});

export const mapStopLossFromBackend = ({
  order_id,
  type,
  price,
  status,
}: StopLossOnBackend): StopLoss => ({
  orderId: order_id,
  triggerType: type,
  price: getBackendCurrencyValue(price) as number,
  status,
});

export const mapOrderFromBackend = ({
  id,
  created_at,
  type,
  side,
  event_id,
  requested_items_quantity,
  requested_max_inv,
  price,
  slippage,
  matching,
  auto_cancel,
  stop_loss,
  take_profit,
}: OrderOnBackend): Order => ({
  id,
  created: getDateFromIsoString(created_at),
  orderType: type,
  choice: side,
  eventId: event_id,
  requestedItemCount: requested_items_quantity,
  requestedMaxInv: getBackendCurrencyValue(requested_max_inv) as number,
  price: getBackendCurrencyValue(price),
  slippage: getBackendCurrencyValue(slippage),
  matching,
  auto_cancel: isNil(auto_cancel)
    ? null
    : mapAutoCancelFromBackend(auto_cancel),
  stop_loss: isNil(stop_loss) ? null : mapStopLossFromBackend(stop_loss),
  take_profit: isNil(take_profit) ? null : mapStopLossFromBackend(take_profit),
});

export const mapOrderFullInfoFromBackend = ({
  id,
  start_date,
  end_date,
  type,
  side,
  requested_items_quantity,
  executed_items_quantity,
  requested_max_inv,
  executed_max_inv,
  investment,
  invested,
  current_value,
  live_profit,
  auto_cancel,
  stop_loss,
  take_profit,
  price,
  slippage,
  selling_price,
  potential_profit,
  avg_exit_price,
  unfilled,
  matched_quantity,
  matching,
  profit,
  cancelled,
}: OrderFullInfoOnBackend): OrderFullInfo => ({
  id,
  startDate: getDateFromIsoString(start_date),
  endDate: getDateFromIsoString(end_date),
  orderType: type,
  choice: side,
  requested_items_quantity: requested_items_quantity ?? null,
  executed_items_quantity: executed_items_quantity ?? null,
  requested_max_inv: getBackendCurrencyValue(requested_max_inv),
  executed_max_inv: getBackendCurrencyValue(executed_max_inv),
  investment: getBackendCurrencyValue(investment),
  invested: getBackendCurrencyValue(invested),
  current_value: getBackendCurrencyValue(current_value),
  live_profit: getBackendCurrencyValue(live_profit),
  auto_cancel: isNil(auto_cancel)
    ? null
    : mapAutoCancelFromBackend(auto_cancel),
  stop_loss: isNil(stop_loss) ? null : mapStopLossFromBackend(stop_loss),
  take_profit: isNil(take_profit) ? null : mapStopLossFromBackend(take_profit),
  price: getBackendCurrencyValue(price),
  slippage: getBackendCurrencyValue(slippage),
  selling_price: getBackendCurrencyValue(selling_price),
  potential_profit: getBackendCurrencyValue(potential_profit),
  avg_exit_price: getBackendCurrencyValue(avg_exit_price),
  unfilled: getBackendCurrencyValue(unfilled),
  matched_quantity: matched_quantity ?? null,
  matching: matching ?? null,
  profit: getBackendCurrencyValue(profit),
  cancelled: cancelled ?? null,
});

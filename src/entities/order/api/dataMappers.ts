import isNil from 'lodash/isNil';

import {getDateFromIsoString} from '@shared/api';
import {currencyValueDivider} from '@shared/constants';
import {Order} from '../types';
import {OrderOnBackend} from './backendTypes';

export const mapOrderFromBackend = ({
  id,
  start_date,
  end_date,
  type,
  side,
  event_id,
  requested_items_quantity,
  requested_max_inv,
  price,
  slippage,
  matching,
}: OrderOnBackend): Order => ({
  id,
  startDate: getDateFromIsoString(start_date),
  endDate: getDateFromIsoString(end_date),
  orderType: type,
  choice: side,
  eventId: event_id,
  requestedItemCount: requested_items_quantity,
  requestedMaxInv: requested_max_inv,
  price: isNil(price) ? null : price / currencyValueDivider,
  slippage: slippage ?? null,
  matching,
});

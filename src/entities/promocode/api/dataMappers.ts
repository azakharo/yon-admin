import {Promocode} from '../types';
import {PromocodeOnBackend} from './backendTypes';

import {getDateFromIsoString} from '@/shared/api';

export const mapPromocodeFromBackend = ({
  code,
  name,
  description,
  created_at,
  updated_at,
  expires_at,
  apply_count_limit,
  usage_count_limit,
  usage_amount_limit,
  note,
  status,
  type,
}: PromocodeOnBackend): Promocode => ({
  code,
  name,
  description,
  created: getDateFromIsoString(created_at),
  updated: getDateFromIsoString(updated_at),
  expiresAt: expires_at ? getDateFromIsoString(expires_at) : null,
  applyCountLimit: apply_count_limit,
  usageCountLimit: usage_count_limit,
  usageAmountLimit: usage_amount_limit,
  note,
  status,
  promocodeType: type,
});

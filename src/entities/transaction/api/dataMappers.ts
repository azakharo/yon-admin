import {getDateFromIsoString} from '@shared/api';
import {currencyValueDivider} from '@shared/constants';
import {Transaction} from '../types';
import {TransactionOnBackend} from './backendTypes';

export const mapTransactionFromBackend = ({
  id,
  real_amount,
  promo_amount,
  created_at,
  related_entity,
  related_entity_id,
  label,
  payment_type,
  meta,
}: TransactionOnBackend): Transaction => ({
  id,
  value: real_amount / currencyValueDivider,
  bonus: promo_amount / currencyValueDivider,
  created: getDateFromIsoString(created_at),
  relatedEntity: related_entity ?? '',
  relatedEntityId: related_entity_id ?? '',
  label: label ? label.toLowerCase() : '',
  paymentType: payment_type ?? '',
  meta: meta ?? [],
});

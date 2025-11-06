import {InferType} from 'yup';

import {v8nSchemaOfCreatePromocodeParams} from './api';

// The values are backend specific
export enum PromocodeType {
  status = 'status',
  bonus = 'bonus',
  commissionFree = 'commission_free',
}

// The values are backend specific
export enum PromocodeStatus {
  active = 'active',
  inactive = 'inactive',
}

export interface Promocode {
  code: string;
  name: string;
  description: string;
  created: Date;
  updated: Date;
  expiresAt: Date | null;
  applyCountLimit: number;
  usageCountLimit: number | null;
  usageAmountLimit: number | null;
  note: string;
  promocodeType: PromocodeType;
  status: PromocodeStatus;
}

export type CreatePromocodeParams = InferType<
  typeof v8nSchemaOfCreatePromocodeParams
>;

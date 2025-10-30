import {Category, SubCategory} from '../category';

// The values are defined by the backend
export enum EventStatus {
  active = 'active',
  closed = 'closed',
  waitingForResult = 'waiting_for_result',
  disputed = 'disputed',
  null = 'null',
}

// The values are defined by the backend
export enum EventResult {
  yes = 'yes',
  no = 'no',
  waitingForResult = 'waiting_for_result',
  disputed = 'disputed',
  null = 'null',
}

export interface Event {
  id: string;
  name: string;
  description: string;
  category: Category;
  subCategories: SubCategory[];
  startDate: Date;
  isFavorite: boolean;
  logoUrl: string;
  yesPrice: number;
  noPrice: number;
  isLive: boolean;
  yesText: string;
  noText: string;
  tradingVolume: number;
  status: EventStatus;
  result: EventResult;
}

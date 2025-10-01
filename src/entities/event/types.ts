import {Category, SubCategory} from '../category';

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
}

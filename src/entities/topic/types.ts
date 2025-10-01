import {SubCategory} from '../category';

export interface Topic {
  id: string;
  name: string;
  logoUrl: string;
  categoryName: string;
  subCategories: SubCategory[];
  startDate: Date;
  isLive: boolean;
}

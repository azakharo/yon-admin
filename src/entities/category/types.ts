import {SubCategoryOnBackend} from './api/backendTypes';

export interface Category {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
}

export type SubCategory = SubCategoryOnBackend;

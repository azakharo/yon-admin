import {getDateFromIsoString} from '@shared/api';
import {Category} from '../../category';
import {Event} from '../types';
import {EventOnBackend} from './backendTypes';

export const mapEventFromBackend = (
  {
    id,
    name,
    description,
    logo_url,
    category_name,
    sub_categories,
    start_date,
    is_live,
    is_favorite,
    yes_price,
    yes_text,
    no_price,
    no_text,
    trading_volume,
  }: EventOnBackend,
  categories: Category[],
): Event => ({
  id,
  name,
  description,
  logoUrl: logo_url ?? '',
  category: categories.find(cat => cat.name === category_name)!,
  subCategories: sub_categories,
  startDate: getDateFromIsoString(start_date),
  isLive: is_live,
  isFavorite: is_favorite,
  yesPrice: yes_price ?? 0,
  yesText: yes_text ?? '',
  noPrice: no_price ?? 0,
  noText: no_text ?? '',
  tradingVolume: trading_volume,
});

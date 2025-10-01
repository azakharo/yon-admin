import {Category} from '../types';
import {CategoryOnBackend} from './backendTypes';

export const mapCategoryFromBackend = ({
  id,
  name,
  description,
  logo_url,
  banner_url,
}: CategoryOnBackend): Category => ({
  id,
  name,
  description,
  logoUrl: logo_url ?? '',
  bannerUrl: banner_url ?? '',
});

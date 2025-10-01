import {getDateFromIsoString} from '@shared/api';
import {Topic} from '../types';
import {TopicOnBackend} from './backendTypes';

export const mapTopicFromBackend = ({
  id,
  name,
  logo_url,
  category_name,
  sub_categories,
  start_date,
  is_live,
}: TopicOnBackend): Topic => ({
  id,
  name,
  logoUrl: logo_url ?? '',
  categoryName: category_name,
  subCategories: sub_categories,
  startDate: getDateFromIsoString(start_date),
  isLive: is_live,
});

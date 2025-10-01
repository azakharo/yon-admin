import {Banner} from '../types';
import {BannerOnBackend} from './backendTypes';

export const mapBannerFromBackend = ({
  id,
  logo_url,
  web_url,
}: BannerOnBackend): Banner => ({
  id,
  logoUrl: logo_url,
  targetUrl: web_url ?? '',
});

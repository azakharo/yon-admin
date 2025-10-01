import {defineMock} from 'vite-plugin-mock-dev-server';

import {GeoFilterOptionOnBackend} from '@entities/common/api/backendTypes';

const filterOptions: GeoFilterOptionOnBackend[] = [
  {
    id: 'global',
    name: 'Global',
    logo_url: null,
  },
  {
    id: 'brazil',
    name: 'Brazil',
    logo_url: null,
  },
  {
    id: 'mexico',
    name: 'Mexico',
    logo_url: null,
  },
  {
    id: 'portugal',
    name: 'Portugal',
    logo_url: 'https://flagicons.lipis.dev/flags/1x1/ax.svg',
  },
  {
    id: 'england',
    name: 'England',
    logo_url: null,
  },
  {
    id: 'philippines',
    name: 'Philippines',
    logo_url: null,
  },
];

export default defineMock({
  enabled: false,
  url: '/v1/events/filters',
  method: 'GET',
  delay: 1500,
  body: () => {
    return filterOptions;
  },
});

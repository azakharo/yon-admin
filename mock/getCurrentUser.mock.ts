import {defineMock} from 'vite-plugin-mock-dev-server';

export default defineMock({
  enabled: false,
  url: '/v1/profile/me',
  method: 'GET',
  delay: 1500,
  status: 502,
});

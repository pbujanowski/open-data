import { AxiosHeaders, AxiosResponse } from 'axios';

export const createAxiosResponseFixture = <T>(
  data: T,
  status = 200,
  statusText = 'OK',
): AxiosResponse<T> => ({
  data,
  status,
  statusText,
  headers: {},
  config: {
    url: 'https://api.example.com/gold-prices',
    headers: new AxiosHeaders().set('Content-Type', 'application/json'),
  },
});

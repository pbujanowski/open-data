import { describe, it, expect } from 'vitest';
import { apiConfig } from '../apiConfig';

describe('apiConfig', () => {
  it('should return the correct URL for getCurrentGoldPriceUrl', () => {
    const config = apiConfig();
    expect(config.getCurrentGoldPriceUrl()).toBe(
      'http://localhost:5002/gold-prices/current',
    );
  });

  it('should return the correct URL for getLastGoldPricesUrl with topCount', () => {
    const config = apiConfig();
    expect(config.getLastGoldPricesUrl(5)).toBe(
      'http://localhost:5002/gold-prices/last/5',
    );
  });

  it('should return the correct URL for getTodayGoldPriceUrl', () => {
    const config = apiConfig();
    expect(config.getTodayGoldPriceUrl()).toBe(
      'http://localhost:5002/gold-prices/today',
    );
  });

  it('should return the correct URL for getGoldPriceByDateUrl with a date', () => {
    const config = apiConfig();
    expect(config.getGoldPriceByDateUrl('2023-01-01')).toBe(
      'http://localhost:5002/gold-prices/by-date/2023-01-01',
    );
  });

  it('should return the correct URL for getGoldPricesByDateRangeUrl with startDate and endDate', () => {
    const config = apiConfig();
    expect(config.getGoldPricesByDateRangeUrl('2023-01-01', '2023-01-31')).toBe(
      'http://localhost:5002/gold-prices/by-date-range/2023-01-01/2023-01-31',
    );
  });

  it('should use the default base URL if VITE_API_URL is not set', () => {
    const config = apiConfig();
    expect(config.getCurrentGoldPriceUrl()).toBe(
      'http://localhost:5002/gold-prices/current',
    );
  });
});

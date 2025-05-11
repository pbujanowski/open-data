export const apiConfig = () => {
  const urls = {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5002',
    endpoints: {
      currentGoldPrice: '/gold-prices/current',
      lastGoldPrices: '/gold-prices/last',
      todayGoldPrice: '/gold-prices/today',
      goldPriceByDate: '/gold-prices/by-date',
      goldPricesByDateRange: '/gold-prices/by-date-range',
    },
  } as const;

  return {
    getCurrentGoldPriceUrl: () =>
      `${urls.baseUrl}${urls.endpoints.currentGoldPrice}`,

    getLastGoldPricesUrl: (topCount: number) =>
      `${urls.baseUrl}${urls.endpoints.lastGoldPrices}/${topCount}`,

    getTodayGoldPriceUrl: () =>
      `${urls.baseUrl}${urls.endpoints.todayGoldPrice}`,

    getGoldPriceByDateUrl: (date: string) =>
      `${urls.baseUrl}${urls.endpoints.goldPriceByDate}/${date}`,

    getGoldPricesByDateRangeUrl: (startDate: string, endDate: string) =>
      `${urls.baseUrl}${urls.endpoints.goldPricesByDateRange}/${startDate}/${endDate}`,
  };
};

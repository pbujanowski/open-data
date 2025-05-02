export const apiConfig = () => {
  const urls = {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5001',
    endpoints: {
      currentGoldPrice: '/gold-prices/current',
      lastGoldPrices: '/gold-prices/last',
      todayGoldPrice: '/gold-prices/today',
    },
  } as const;

  return {
    getCurrentGoldPriceUrl: () =>
      `${urls.baseUrl}${urls.endpoints.currentGoldPrice}`,

    getLastGoldPricesUrl: (topCount: number) =>
      `${urls.baseUrl}${urls.endpoints.lastGoldPrices}/${topCount}`,

    getTodayGoldPriceUrl: () =>
      `${urls.baseUrl}${urls.endpoints.todayGoldPrice}`,
  };
};

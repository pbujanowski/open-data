export const apiConfig = () => {
  const urls = {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5001',
    endpoints: {
      currentGoldPrice: '/gold-prices/current',
    },
  } as const;

  return {
    getCurrentGoldPriceUrl: () =>
      `${urls.baseUrl}${urls.endpoints.currentGoldPrice}`,
  };
};

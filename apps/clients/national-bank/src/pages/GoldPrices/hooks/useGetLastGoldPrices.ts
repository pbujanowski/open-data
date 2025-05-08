import { useQuery } from '@tanstack/react-query';
import { apiConfig } from '../../../configs/apiConfig';
import { GoldPriceModel } from '../models/GoldPriceModel';

export const useGetLastGoldPrices = (topCount: number) => {
  const { getLastGoldPricesUrl } = apiConfig();

  return useQuery({
    queryKey: ['lastGoldPrices', topCount],
    queryFn: async (): Promise<GoldPriceModel[]> => {
      const response = await fetch(getLastGoldPricesUrl(topCount));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return data.map((item: GoldPriceModel) => ({
        date: item.date,
        price: item.price,
      }));
    },
  });
};

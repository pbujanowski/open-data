import { useQuery } from '@tanstack/react-query';
import { apiConfig } from '../../../configs/apiConfig';
import { GoldPriceModel } from '../models/GoldPriceModel';

export const useGetGoldPriceByDate = (date: string) => {
  const { getGoldPriceByDateUrl } = apiConfig();

  return useQuery({
    queryKey: ['goldPriceByDate', date],
    queryFn: async (): Promise<GoldPriceModel> => {
      const response = await fetch(getGoldPriceByDateUrl(date));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return {
        date: data.date,
        price: data.price,
      };
    },
  });
};

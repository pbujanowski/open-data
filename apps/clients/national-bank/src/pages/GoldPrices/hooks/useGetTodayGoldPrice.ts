import { useQuery } from '@tanstack/react-query';
import { GoldPriceModel } from '../models/GoldPriceModel';
import { apiConfig } from '../../../configs/apiConfig';

export const useGetTodayGoldPrice = () => {
  const { getTodayGoldPriceUrl } = apiConfig();

  return useQuery({
    queryKey: ['todayGoldPrice'],
    queryFn: async (): Promise<GoldPriceModel> => {
      const response = await fetch(getTodayGoldPriceUrl());
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

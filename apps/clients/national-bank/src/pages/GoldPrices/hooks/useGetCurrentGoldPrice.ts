import { useQuery } from '@tanstack/react-query';
import { GoldPriceModel } from '../models/GoldPriceModel';
import { apiConfig } from '../../../configs/apiConfig';

export const useGetCurrentGoldPrice = () => {
  const { getCurrentGoldPriceUrl } = apiConfig();

  return useQuery({
    queryKey: ['currentGoldPrice'],
    queryFn: async (): Promise<GoldPriceModel> => {
      const response = await fetch(getCurrentGoldPriceUrl());
      const data = await response.json();
      return {
        date: data.date,
        price: data.price,
      };
    },
  });
};

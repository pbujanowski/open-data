import { useQuery } from '@tanstack/react-query';
import { apiConfig } from '../../../configs/apiConfig';
import { GoldPriceModel } from '../models/GoldPriceModel';

export const useGetGoldPricesByDateRange = (
  startDate: string,
  endDate: string,
) => {
  const { getGoldPricesByDateRangeUrl } = apiConfig();

  return useQuery({
    queryKey: ['goldPricesByDateRange', startDate, endDate],
    queryFn: async (): Promise<GoldPriceModel[]> => {
      const response = await fetch(
        getGoldPricesByDateRangeUrl(startDate, endDate),
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return data;
    },
  });
};

import axios from "axios";
import { GoldPriceDto, GoldPricesByDatesDto, GoldPricesCountDto, GoldPricesFiltersDto } from "open-data-common";

import { appConfig } from "../configs";
import { dateUtils } from "../utils";

const nbpService = () => {
  const url = `${appConfig().apiUrl}/nbp`;

  const getCurrentGoldPrice = async (): Promise<GoldPriceDto> => {
    const response = await axios.get(`${url}/currentGoldPrice`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  };

  const getGoldPricesCount = async (filters: GoldPricesFiltersDto): Promise<GoldPricesCountDto> => {
    const startDateFormatted = dateUtils().toDateString(filters.startDate);
    const endDateFormatted = dateUtils().toDateString(filters.endDate);
    const queryParams = `?startDate=${startDateFormatted}&endDate=${endDateFormatted}`;
    const response = await axios.get(`${url}/goldPricesCount${queryParams}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  };

  const getGoldPricesWithFilters = async (
    pageNumber: number,
    pageSize: number,
    filters: GoldPricesFiltersDto,
  ): Promise<GoldPriceDto[]> => {
    const startDateFormatted = dateUtils().toDateString(filters.startDate);
    const endDateFormatted = dateUtils().toDateString(filters.endDate);
    const queryParams = `?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDateFormatted}&endDate=${endDateFormatted}`;
    const response = await axios.get(`${url}/goldPrices${queryParams}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  };

  const synchronizeGoldPricesByDates = async (startDate: string, endDate: string): Promise<void> => {
    const startDateFormatted = dateUtils().toDateString(startDate);
    const endDateFormatted = dateUtils().toDateString(endDate);
    const parameters: GoldPricesByDatesDto = {
      startDate: startDateFormatted,
      endDate: endDateFormatted,
    };
    const response = await axios.post(`${url}/synchronizeGoldPricesByDates`, { ...parameters });
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
  };

  return {
    getCurrentGoldPrice,
    getGoldPricesCount,
    getGoldPricesWithFilters,
    synchronizeGoldPricesByDates,
  };
};

export { nbpService };
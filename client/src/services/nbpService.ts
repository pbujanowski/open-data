import axios from "axios";
import { format } from "date-fns";
import { GoldPriceDto, GoldPricesByDatesDto } from "open-data-common";

import { appConfig } from "../configs";

const nbpService = () => {
  const url = `${appConfig().apiUrl}/nbp`;
  const dateFormat = "yyyy-MM-dd";

  const getCurrentGoldPrice = async (): Promise<GoldPriceDto> => {
    const response = await axios.get(`${url}/currentGoldPrice`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  };

  const getGoldPricesByDates = async (startDate: string, endDate: string): Promise<GoldPriceDto[]> => {
    const startDateFormatted = format(new Date(startDate), dateFormat);
    const endDateFormatted = format(new Date(endDate), dateFormat);
    const response = await axios.get(`${url}/goldPricesByDates/${startDateFormatted}/${endDateFormatted}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  };

  const synchronizeGoldPricesByDates = async (startDate: string, endDate: string): Promise<void> => {
    const startDateFormatted = format(new Date(startDate), dateFormat);
    const endDateFormatted = format(new Date(endDate), dateFormat);
    const parameters: GoldPricesByDatesDto = {
      startDate: startDateFormatted,
      endDate: endDateFormatted,
    };
    const response = await axios.post(`${url}/synchronizeGoldPricesByDates`, { ...parameters });
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
  };

  return { getCurrentGoldPrice, getGoldPricesByDates, synchronizeGoldPricesByDates };
};

export { nbpService };

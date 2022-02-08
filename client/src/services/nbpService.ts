import axios from "axios";
import { format } from "date-fns";
import { GoldPriceDto } from "open-data-common";

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

  const getGoldPricesByDate = async (startDate: string, endDate: string): Promise<GoldPriceDto[]> => {
    const startDateFormatted = format(new Date(startDate), dateFormat);
    const endDateFormatted = format(new Date(endDate), dateFormat);
    const response = await axios.get(`${url}/goldPricesByDate/${startDateFormatted}/${endDateFormatted}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  };

  return { getCurrentGoldPrice, getGoldPricesByDate };
};

export { nbpService };

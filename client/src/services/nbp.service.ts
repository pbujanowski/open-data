import axios from "axios";
import dayJs from "dayjs";
import { GoldPriceDto } from "open-data-common";

import { appConfig } from "../configs";

const nbpService = () => {
  const url = `${appConfig.API_URL}/nbp`;
  const dateFormat = "YYYY-MM-DD";

  const getCurrentGoldPrice = async (): Promise<GoldPriceDto> => {
    const response = await axios.get(`${url}/currentGoldPrice`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  };

  const getGoldPricesByDate = async (startDate: string, endDate: string): Promise<GoldPriceDto[]> => {
    const queryParams = `startDate=${dayJs(startDate).format(dateFormat)}&endDate=${dayJs(endDate).format(dateFormat)}`;
    const response = await axios.get(`${url}/goldPricesByDate?${queryParams}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  };

  return { getCurrentGoldPrice, getGoldPricesByDate };
};

const NbpService = nbpService();

export default NbpService;

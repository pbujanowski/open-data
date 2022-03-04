import axios from "axios";
import { v4 as uuid } from "uuid";

import { GoldPriceDto, NbpGoldPriceDto } from "open-data-common";

const nbpService = () => {
  const url = "http://api.nbp.pl/api";

  const getCurrentGoldPrice = async (): Promise<GoldPriceDto> => {
    const response = await axios.get(`${url}/cenyzlota`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const array = response.data as NbpGoldPriceDto[];
    const result = array[0];

    return {
      id: uuid(),
      date: result.data,
      price: result.cena,
    };
  };

  const getGoldPricesByDates = async (startDate: string, endDate: string): Promise<GoldPriceDto[]> => {
    const response = await axios.get(`${url}/cenyzlota/${startDate}/${endDate}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const array = response.data as NbpGoldPriceDto[];
    const result: GoldPriceDto[] = array.map((item) => {
      return {
        id: uuid(),
        date: item.data,
        price: item.cena,
      };
    });

    return result;
  };

  return { getCurrentGoldPrice, getGoldPricesByDates };
};

export { nbpService };

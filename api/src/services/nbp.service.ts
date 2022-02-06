import axios from "axios";

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
      date: result.data,
      price: result.cena,
    };
  };

  return { getCurrentGoldPrice };
};

const NbpService = nbpService();

export default NbpService;

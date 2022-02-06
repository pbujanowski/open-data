import axios from "axios";
import { GoldPriceDto } from "open-data-common";

import { appConfig } from "../configs";

const nbpService = () => {
  const url = `${appConfig.API_URL}/nbp`;

  const getCurrentGoldPrice = async (): Promise<GoldPriceDto> => {
    const response = await axios.get(`${url}/currentGoldPrice`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  };

  return { getCurrentGoldPrice };
};

const NbpService = nbpService();

export default NbpService;

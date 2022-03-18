import axios from "axios";

import { ExchangeRateDto } from "dtos/ExchangeRateDto";
import { appConfig } from "configs";

const exchangeRateService = () => {
  const httpClient = axios.create({
    baseURL: `${appConfig().apiUrl}/nationalBank/exchangeRates`,
  });

  const getCurrentExchangeRates = async (table: string): Promise<ExchangeRateDto[]> => {
    const response = await httpClient.get(`/current/${table}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  };

  return { getCurrentExchangeRates };
};

export { exchangeRateService };

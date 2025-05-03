import { Stack } from '@mui/material';
import { CurrentGoldPrice } from './components/CurrentGoldPrice';
import { LastGoldPrices } from './components/LastGoldPrices';
import { TodayGoldPrice } from './components/TodayGoldPrice';
import { GoldPriceByDate } from './components/GoldPriceByDate';
import { GoldPricesByDateRange } from './components/GoldPricesByDateRange';

export const GoldPricesPage = () => {
  return (
    <Stack spacing={2}>
      <CurrentGoldPrice />
      <LastGoldPrices />
      <TodayGoldPrice />
      <GoldPriceByDate />
      <GoldPricesByDateRange />
    </Stack>
  );
};

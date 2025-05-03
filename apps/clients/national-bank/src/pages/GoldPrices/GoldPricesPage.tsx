import { Stack } from '@mui/material';
import { CurrentGoldPrice } from './components/CurrentGoldPrice';
import { LastGoldPrices } from './components/LastGoldPrices';
import { TodayGoldPrice } from './components/TodayGoldPrice';
import { GoldPriceByDate } from './components/GoldPriceByDate';

export const GoldPricesPage = () => {
  return (
    <Stack spacing={2}>
      <CurrentGoldPrice />
      <LastGoldPrices />
      <TodayGoldPrice />
      <GoldPriceByDate />
    </Stack>
  );
};

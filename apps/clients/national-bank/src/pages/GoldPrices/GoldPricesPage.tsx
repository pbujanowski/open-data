import { Stack } from '@mui/material';
import { CurrentGoldPrice } from './components/CurrentGoldPrice';
import { LastGoldPrices } from './components/LastGoldPrices';

export const GoldPricesPage = () => {
  return (
    <Stack spacing={2}>
      <CurrentGoldPrice />
      <LastGoldPrices />
    </Stack>
  );
};

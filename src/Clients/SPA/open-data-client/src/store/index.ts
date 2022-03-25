import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { exchangeRateSlice, goldPriceSlice } from "slices";

export const store = configureStore({
  reducer: {
    exchangeRate: exchangeRateSlice.reducer,
    goldPrice: goldPriceSlice.reducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

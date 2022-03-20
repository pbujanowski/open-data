import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { goldPriceSlice, exchangeRateSlice } from "slices";

export const store = configureStore({
  reducer: {
    goldPrice: goldPriceSlice.reducer,
    exchangeRate: exchangeRateSlice.reducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

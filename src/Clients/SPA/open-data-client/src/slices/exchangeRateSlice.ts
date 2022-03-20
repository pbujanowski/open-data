import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExchangeRateDto } from "dtos";
import { exchangeRateService } from "services";
import { RootState } from "store";
import { InitialState } from "./InitialState";

interface CurrentExchangeRatesState extends InitialState {
  exchangeRates: ExchangeRateDto[] | null;
}

interface ExchangeRateState {
  currentExchangeRatesState: CurrentExchangeRatesState;
}

const initialState: ExchangeRateState = {
  currentExchangeRatesState: { exchangeRates: null },
};

const fetchCurrentExchangeRates = createAsyncThunk("exchangeRate/fetchCurrentExchangeRates", async (table: string) => {
  const response = await exchangeRateService().getCurrentExchangeRates(table);
  return response;
});

const selectCurrentExchangeRatesState = (state: RootState) => state.exchangeRate.currentExchangeRatesState;

const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentExchangeRates.fulfilled, (state, action) => {
      state.currentExchangeRatesState.exchangeRates = [...action.payload];
      state.currentExchangeRatesState.isLoading = false;
      state.currentExchangeRatesState.isError = false;
      state.currentExchangeRatesState.error = undefined;
    });
    builder.addCase(fetchCurrentExchangeRates.pending, (state) => {
      state.currentExchangeRatesState.isLoading = true;
      state.currentExchangeRatesState.isError = false;
      state.currentExchangeRatesState.error = undefined;
    });
    builder.addCase(fetchCurrentExchangeRates.rejected, (state, action) => {
      state.currentExchangeRatesState.isLoading = false;
      state.currentExchangeRatesState.isError = true;
      state.currentExchangeRatesState.error = { ...action.error };
    });
  },
});

export { exchangeRateSlice, fetchCurrentExchangeRates, selectCurrentExchangeRatesState };

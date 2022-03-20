import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { GoldPriceDto, GoldPricesByDatesDto, GoldPricesCountDto, GoldPricesFiltersDto } from "dtos";
import { goldPriceService } from "services";
import { RootState } from "store";
import { InitialState } from "./InitialState";

interface CurrentGoldPriceState extends InitialState {
  goldPrice: GoldPriceDto | null;
}

interface GoldPricesWithFiltersState extends InitialState {
  goldPrices: GoldPriceDto[] | null;
  goldPricesCount: GoldPricesCountDto;
  pageNumber: number;
  pageSize: number;
  filters: GoldPricesFiltersDto;
}

interface SynchronizeGoldPricesByDatesState extends InitialState {
  dates: GoldPricesByDatesDto;
}

export interface GoldPriceState {
  currentGoldPriceState: CurrentGoldPriceState;
  goldPricesWithFiltersState: GoldPricesWithFiltersState;
  synchronizeGoldPricesByDatesState: SynchronizeGoldPricesByDatesState;
}

const initialState: GoldPriceState = {
  currentGoldPriceState: { goldPrice: null },
  goldPricesWithFiltersState: {
    goldPrices: null,
    goldPricesCount: { count: 0 },
    pageNumber: 1,
    pageSize: 10,
    filters: {
      startDate: addDays(new Date(Date.now()), -1).toDateString(),
      endDate: new Date(Date.now()).toDateString(),
    },
  },
  synchronizeGoldPricesByDatesState: {
    dates: {
      startDate: addDays(new Date(Date.now()), -1).toDateString(),
      endDate: new Date(Date.now()).toDateString(),
    },
  },
};

const fetchCurrentGoldPrice = createAsyncThunk("goldPrice/fetchCurrentGoldPrice", async () => {
  const response = await goldPriceService().getCurrentGoldPrice();
  return response;
});

const fetchGoldPricesWithFilters = createAsyncThunk(
  "goldPrice/fetchGoldPricesWithFilters",
  async ({
    pageNumber,
    pageSize,
    filters,
  }: {
    pageNumber: number;
    pageSize: number;
    filters: GoldPricesFiltersDto;
  }) => {
    const count = await goldPriceService().getGoldPricesCount(filters);
    const data = await goldPriceService().getGoldPricesWithFilters(pageNumber, pageSize, filters);
    return { count, data };
  },
);

const synchronizeGoldPricesByDates = createAsyncThunk(
  "goldPrice/synchronizeGoldPricesByDates",
  async (dates: GoldPricesByDatesDto) => {
    await goldPriceService().synchronizeGoldPricesByDates(dates.startDate, dates.endDate);
  },
);

const goldPriceSlice = createSlice({
  name: "goldPrice",
  initialState,
  reducers: {
    setGoldPricesWithFiltersPageNumber: (state, action: PayloadAction<number>) => {
      state.goldPricesWithFiltersState.pageNumber = action.payload;
    },
    setGoldPricesWithFiltersPageSize: (state, action: PayloadAction<number>) => {
      state.goldPricesWithFiltersState.pageSize = action.payload;
    },
    setGoldPricesWithFiltersStartDate: (state, action: PayloadAction<string>) => {
      state.goldPricesWithFiltersState.filters.startDate = action.payload;
    },
    setGoldPricesWithFiltersEndDate: (state, action: PayloadAction<string>) => {
      state.goldPricesWithFiltersState.filters.endDate = action.payload;
    },
    setSynchronizeGoldPricesByDatesStartDate: (state, action: PayloadAction<string>) => {
      state.synchronizeGoldPricesByDatesState.dates.startDate = action.payload;
    },
    setSynchronizeGoldPricesByDatesEndDate: (state, action: PayloadAction<string>) => {
      state.synchronizeGoldPricesByDatesState.dates.endDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentGoldPrice.fulfilled, (state, action) => {
      state.currentGoldPriceState.goldPrice = { ...action.payload };
      state.currentGoldPriceState.isLoading = false;
      state.currentGoldPriceState.isError = false;
      state.currentGoldPriceState.error = undefined;
    });
    builder.addCase(fetchCurrentGoldPrice.pending, (state) => {
      state.currentGoldPriceState.isLoading = true;
      state.currentGoldPriceState.isError = false;
      state.currentGoldPriceState.error = undefined;
    });
    builder.addCase(fetchCurrentGoldPrice.rejected, (state, action) => {
      state.currentGoldPriceState.isLoading = false;
      state.currentGoldPriceState.isError = true;
      state.currentGoldPriceState.error = { ...action.error };
    });

    builder.addCase(fetchGoldPricesWithFilters.fulfilled, (state, action) => {
      state.goldPricesWithFiltersState.goldPricesCount = { ...action.payload.count };
      state.goldPricesWithFiltersState.goldPrices = [...action.payload.data];
      state.goldPricesWithFiltersState.isLoading = false;
      state.goldPricesWithFiltersState.isError = false;
      state.goldPricesWithFiltersState.error = undefined;
    });
    builder.addCase(fetchGoldPricesWithFilters.pending, (state) => {
      state.goldPricesWithFiltersState.isLoading = true;
      state.goldPricesWithFiltersState.isError = false;
      state.goldPricesWithFiltersState.error = undefined;
    });
    builder.addCase(fetchGoldPricesWithFilters.rejected, (state, action) => {
      state.goldPricesWithFiltersState.isLoading = false;
      state.goldPricesWithFiltersState.isError = true;
      state.goldPricesWithFiltersState.error = { ...action.error };
    });

    builder.addCase(synchronizeGoldPricesByDates.fulfilled, (state) => {
      state.synchronizeGoldPricesByDatesState.isLoading = false;
      state.synchronizeGoldPricesByDatesState.isError = false;
      state.synchronizeGoldPricesByDatesState.error = undefined;
    });
    builder.addCase(synchronizeGoldPricesByDates.pending, (state) => {
      state.synchronizeGoldPricesByDatesState.isLoading = true;
      state.synchronizeGoldPricesByDatesState.isError = false;
      state.synchronizeGoldPricesByDatesState.error = undefined;
    });
    builder.addCase(synchronizeGoldPricesByDates.rejected, (state, action) => {
      state.synchronizeGoldPricesByDatesState.isLoading = false;
      state.synchronizeGoldPricesByDatesState.isError = true;
      state.synchronizeGoldPricesByDatesState.error = { ...action.error };
    });
  },
});

const selectCurrentGoldPriceState = (state: RootState) => state.goldPrice.currentGoldPriceState;
const selectGoldPricesWithFiltersState = (state: RootState) => state.goldPrice.goldPricesWithFiltersState;
const selectSynchronizeGoldPricesByDatesState = (state: RootState) => state.goldPrice.synchronizeGoldPricesByDatesState;

export const {
  setGoldPricesWithFiltersPageNumber,
  setGoldPricesWithFiltersPageSize,
  setGoldPricesWithFiltersStartDate,
  setGoldPricesWithFiltersEndDate,
  setSynchronizeGoldPricesByDatesStartDate,
  setSynchronizeGoldPricesByDatesEndDate,
} = goldPriceSlice.actions;

export {
  goldPriceSlice,
  fetchCurrentGoldPrice,
  fetchGoldPricesWithFilters,
  synchronizeGoldPricesByDates,
  selectCurrentGoldPriceState,
  selectGoldPricesWithFiltersState,
  selectSynchronizeGoldPricesByDatesState,
};

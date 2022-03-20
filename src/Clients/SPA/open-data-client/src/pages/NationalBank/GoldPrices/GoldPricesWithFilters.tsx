import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";

import { GoldPricesFilters, GoldPricesTabs } from "./components";

import { AppSnackbar, DataCard, LoadingIndicator } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  fetchGoldPricesWithFilters,
  selectGoldPricesWithFiltersState,
  setGoldPricesWithFiltersPageNumber,
  setGoldPricesWithFiltersPageSize,
  setGoldPricesWithFiltersStartDate,
  setGoldPricesWithFiltersEndDate,
} from "slices";

const GoldPricesWithFilters: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const message = t("nationalBank.messages.cannotFetchGoldPricesWithFilters");
  const { goldPrices, goldPricesCount, pageNumber, pageSize, filters, isLoading, isError } = useAppSelector(
    selectGoldPricesWithFiltersState,
  );

  const handleStartDateChange = (date: string) => {
    dispatch(setGoldPricesWithFiltersStartDate(date));
  };

  const handleEndDateChange = (date: string) => {
    dispatch(setGoldPricesWithFiltersEndDate(date));
  };

  const handlePageNumberChange = (number: number) => {
    dispatch(setGoldPricesWithFiltersPageNumber(number));
  };

  const handlePageSizeChange = (size: number) => {
    dispatch(setGoldPricesWithFiltersPageSize(size));
  };

  const getGoldPricesWithFilters = async () => {
    await dispatch(fetchGoldPricesWithFilters({ pageNumber, pageSize, filters }));
  };

  const getGoldPricesDetails = () => (
    <GoldPricesTabs
      chartProps={{ goldPrices: goldPrices || [] }}
      tableProps={{
        goldPrices: goldPrices || [],
        pageNumber,
        pageSize,
        totalCount: goldPricesCount.count,
        onPageNumberChange: handlePageNumberChange,
        onPageSizeChange: handlePageSizeChange,
      }}
    />
  );

  const getLoadingIndicator = () => <LoadingIndicator />;

  const getDataTitle = () => (
    <Grid container direction="row" spacing={2}>
      <Grid item>{t("nationalBank.goldPricesWithFilters")}</Grid>
      <Grid item>
        <GoldPricesFilters
          startDate={filters.startDate}
          endDate={filters.endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
      </Grid>
      <Grid item>
        <Button size="small" onClick={getGoldPricesWithFilters}>
          {t("common.search")}
        </Button>
      </Grid>
    </Grid>
  );

  const getDataBody = () => (isLoading ? getLoadingIndicator() : getGoldPricesDetails());

  const getErrorSnackbar = () => <AppSnackbar isOpen={isError || false} message={message} type="error" />;

  return <DataCard title={getDataTitle()} body={getDataBody()} additional={getErrorSnackbar()} />;
};

export default GoldPricesWithFilters;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { addDays } from "date-fns";
import { Button, Grid } from "@mui/material";

import { GoldPriceDto, GoldPricesFiltersDto } from "../../dtos";
import { GoldPricesCard, GoldPricesFilters, GoldPricesTabs } from "./components";

import { AppSnackbar, LoadingIndicator } from "../../components";
import { nationalBankService } from "../../services/nationalBankService";

const GoldPricesWithFilters: React.FC = () => {
  const [t] = useTranslation();
  const dateYesterday = addDays(new Date(Date.now()), -1).toDateString();
  const dateToday = new Date(Date.now()).toDateString();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [goldPrices, setGoldPrices] = useState<GoldPriceDto[] | null>(null);
  const [startDate, setStartDate] = useState<string>(dateYesterday);
  const [endDate, setEndDate] = useState<string>(dateToday);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);

  const handleSnackbarOpen = (error: string | null) => {
    setErrorMessage(error);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setErrorMessage(null);
    setIsSnackbarOpen(false);
  };

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
  };

  const handlePageNumberChange = (number: number) => {
    setPageNumber(number);
  };

  const handlePageSizeChange = (size: number) => setPageSize(size);

  const getGoldPricesWithFilters = async () => {
    try {
      setIsLoading(true);
      const filters: GoldPricesFiltersDto = {
        startDate,
        endDate,
      };
      const goldPricesCount = await nationalBankService().getGoldPricesCount(filters);
      setTotalCount(goldPricesCount.count);
      const result = await nationalBankService().getGoldPricesWithFilters(pageNumber, pageSize, filters);
      setGoldPrices(result);
    } catch (e) {
      handleSnackbarOpen(t("nationalBank.messages.cannotFetchGoldPricesWithFilters"));
    } finally {
      setIsLoading(false);
    }
  };

  const getGoldPricesDetails = () => (
    <GoldPricesTabs
      chartProps={{ goldPrices: goldPrices || [] }}
      tableProps={{
        goldPrices: goldPrices || [],
        pageNumber,
        pageSize,
        totalCount,
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
          startDate={startDate}
          endDate={endDate}
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

  const getErrorSnackbar = () => (
    <AppSnackbar isOpen={isSnackbarOpen} message={errorMessage} type="error" onClose={handleSnackbarClose} />
  );

  return <GoldPricesCard title={getDataTitle()} body={getDataBody()} additional={getErrorSnackbar()} />;
};

export default GoldPricesWithFilters;

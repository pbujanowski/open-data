import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { addDays } from "date-fns";
import { Grid } from "@mui/material";
import { GoldPriceDto, GoldPricesFiltersDto } from "open-data-common";

import { GoldPricesCard, GoldPricesFilters, GoldPricesTable } from "./components";

import { AppSnackbar, LoadingIndicator } from "../../components";
import { nbpService } from "../../services/nbpService";

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

  const getGoldPricesWithFilters = useCallback(async () => {
    try {
      setIsLoading(true);
      const filters: GoldPricesFiltersDto = {
        startDate,
        endDate,
      };
      const goldPricesCount = await nbpService().getGoldPricesCount(filters);
      setTotalCount(goldPricesCount.count);
      const result = await nbpService().getGoldPricesWithFilters(pageNumber, pageSize, filters);
      setGoldPrices(result);
    } catch (e) {
      handleSnackbarOpen(t("nbp.messages.cannotFetchGoldPricesWithFilters"));
    } finally {
      setIsLoading(false);
    }
  }, [t, startDate, endDate, pageNumber, pageSize]);

  const getGoldPricesDetails = () => (
    <GoldPricesTable
      goldPrices={goldPrices}
      pageNumber={pageNumber}
      pageSize={pageSize}
      totalCount={totalCount}
      onPageNumberChange={handlePageNumberChange}
      onPageSizeChange={handlePageSizeChange}
    />
  );

  const getLoadingIndicator = () => <LoadingIndicator />;

  const getDataTitle = () => (
    <Grid container direction="row" spacing={2}>
      <Grid item>{t("nbp.goldPricesWithFilters")}</Grid>
      <Grid item>
        <GoldPricesFilters
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
      </Grid>
    </Grid>
  );

  const getDataBody = () => (isLoading ? getLoadingIndicator() : getGoldPricesDetails());

  const getErrorSnackbar = () => (
    <AppSnackbar isOpen={isSnackbarOpen} message={errorMessage} type="error" onClose={handleSnackbarClose} />
  );

  useEffect(() => {
    getGoldPricesWithFilters();
  }, [getGoldPricesWithFilters]);

  return <GoldPricesCard title={getDataTitle()} body={getDataBody()} additional={getErrorSnackbar()} />;
};

export default GoldPricesWithFilters;

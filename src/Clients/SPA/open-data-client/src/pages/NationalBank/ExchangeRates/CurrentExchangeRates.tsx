import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid, MenuItem, Select } from "@mui/material";

import { AppSnackbar, DataCard, LoadingIndicator, NoData } from "components";
import { exchangeRatesTableType } from "constants/exchangeRatesTableType";
import { exchangeRateService } from "services";
import { ExchangeRateDto } from "dtos";

import { ExchangeRatesTable } from "./components";

const CurrentExchangeRates: React.FC = () => {
  const [t] = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateDto[] | null>(null);
  const [exchangeRatesTable, setExchangeRatesTable] = useState<string>(exchangeRatesTableType().tableA);

  const handleSnackbarOpen = (error: string | null) => {
    setMessage(error);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setMessage(null);
    setIsSnackbarOpen(false);
  };

  const getCurrentExchangeRates = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await exchangeRateService().getCurrentExchangeRates(exchangeRatesTable);
      setExchangeRates(result);
    } catch (e) {
      handleSnackbarOpen(t("nationalBank.messages.cannotFetchCurrentExchangeRates"));
    } finally {
      setIsLoading(false);
    }
  }, [t, exchangeRatesTable]);

  const getNoDataDetails = () => <NoData />;

  const getLoadingIndicator = () => <LoadingIndicator />;

  const getExchangeRatesDetails = () => <ExchangeRatesTable exchangeRates={exchangeRates} />;

  const getExchangeRatesBody = () => (exchangeRates ? getExchangeRatesDetails() : getNoDataDetails());

  const getDataTitle = () => (
    <Grid container direction="row" spacing={2}>
      <Grid item>{t("nationalBank.currentExchangeRates")}</Grid>
      <Grid item>
        <Select
          value={exchangeRatesTable}
          onChange={(event) => setExchangeRatesTable(event.target.value)}
          size="small"
          autoWidth
        >
          {exchangeRatesTableType()
            .all()
            .map((type: string) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
        </Select>
      </Grid>
    </Grid>
  );

  const getDataBody = () => (isLoading ? getLoadingIndicator() : getExchangeRatesBody());

  const getSnackbar = () => (
    <AppSnackbar isOpen={isSnackbarOpen} message={message} type="info" onClose={handleSnackbarClose} />
  );

  useEffect(() => {
    getCurrentExchangeRates();
  }, [getCurrentExchangeRates]);

  return <DataCard title={getDataTitle()} body={getDataBody()} additional={getSnackbar()} />;
};

export default CurrentExchangeRates;

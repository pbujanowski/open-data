import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, MenuItem, Select } from "@mui/material";

import { AppSnackbar, DataCard, LoadingIndicator, NoData } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import { exchangeRatesTableType } from "constants/exchangeRatesTableType";
import { fetchCurrentExchangeRates, selectCurrentExchangeRatesState } from "slices";

import { ExchangeRatesTable } from "./components";

const CurrentExchangeRates: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const message = t("nationalBank.messages.cannotFetchCurrentExchangeRates");
  const [exchangeRatesTable, setExchangeRatesTable] = useState<string>(exchangeRatesTableType().tableA);
  const { exchangeRates, isLoading, isError } = useAppSelector(selectCurrentExchangeRatesState);

  const getCurrentExchangeRates = useCallback(async () => {
    await dispatch(fetchCurrentExchangeRates(exchangeRatesTable));
  }, [dispatch, exchangeRatesTable]);

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

  const getDataActions = () => (
    <Button size="small" onClick={getCurrentExchangeRates}>
      {t("common.refresh")}
    </Button>
  );

  const getSnackbar = () => <AppSnackbar isOpen={isError || false} message={message} type="error" />;

  useEffect(() => {
    if (!exchangeRates) {
      getCurrentExchangeRates();
    }
  }, [exchangeRates, getCurrentExchangeRates]);

  return <DataCard title={getDataTitle()} body={getDataBody()} actions={getDataActions()} additional={getSnackbar()} />;
};

export default CurrentExchangeRates;

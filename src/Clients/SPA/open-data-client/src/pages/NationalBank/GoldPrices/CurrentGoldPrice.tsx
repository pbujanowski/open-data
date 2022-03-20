import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@mui/material";

import { AppSnackbar, DataCard, LoadingIndicator, NoData } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import { fetchCurrentGoldPrice, selectCurrentGoldPriceState } from "slices";
import { dateUtils } from "utils";

const CurrentGoldPrice: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const message = t("nationalBank.messages.cannotFetchCurrentGoldPrice");
  const { goldPrice, isLoading, isError } = useAppSelector(selectCurrentGoldPriceState);

  const getCurrentGoldPrice = useCallback(async () => {
    await dispatch(fetchCurrentGoldPrice());
  }, [dispatch]);

  const getGoldPriceDetails = () => (
    <>
      <p>
        <strong>{t("goldPrice.date")}: </strong>
        <span>{dateUtils().toDateString(goldPrice?.date)}</span>
      </p>
      <p>
        <strong>{t("goldPrice.price")}: </strong>
        <span>{goldPrice?.price.toFixed(2)} zł</span>
      </p>
    </>
  );

  const getNoDataDetails = () => <NoData />;

  const getLoadingIndicator = () => <LoadingIndicator />;

  const getGoldPriceBody = () => (goldPrice ? getGoldPriceDetails() : getNoDataDetails());

  const getDataBody = () => (isLoading ? getLoadingIndicator() : getGoldPriceBody());

  const getDataActions = () => (
    <Button size="small" onClick={getCurrentGoldPrice}>
      {t("common.refresh")}
    </Button>
  );

  const getSnackbar = () => <AppSnackbar isOpen={isError || false} message={message} type="error" />;

  useEffect(() => {
    if (!goldPrice) {
      getCurrentGoldPrice();
    }
  }, [goldPrice, getCurrentGoldPrice]);

  return (
    <DataCard
      title={t("nationalBank.currentGoldPrice")}
      body={getDataBody()}
      actions={getDataActions()}
      additional={getSnackbar()}
    />
  );
};

export default CurrentGoldPrice;

import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@mui/material";
import { GoldPriceDto } from "open-data-common";

import { GoldPricesCard } from "./components";
import { AppSnackbar, LoadingIndicator } from "../../components";
import { nbpService } from "../../services/nbpService";

const CurrentGoldPrice: React.FC = () => {
  const [t] = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [goldPrice, setGoldPrice] = useState<GoldPriceDto | null>(null);

  const handleSnackbarOpen = (error: string | null) => {
    setMessage(error);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setMessage(null);
    setIsSnackbarOpen(false);
  };

  const getCurrentGoldPrice = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await nbpService().getCurrentGoldPrice();
      setGoldPrice(result);
    } catch (e) {
      handleSnackbarOpen(t("nbp.messages.cannotFetchCurrentGoldPrice"));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const getGoldPriceDetails = () => (
    <>
      <p>
        <strong>{t("goldPrice.date")}: </strong>
        <span>{goldPrice?.date}</span>
      </p>
      <p>
        <strong>{t("goldPrice.price")}: </strong>
        <span>{goldPrice?.price.toFixed(2)} zł</span>
      </p>
    </>
  );

  const getNoDataDetails = () => (
    <p>
      <strong>{`${t("common.noData")}.`}</strong>
    </p>
  );

  const getLoadingIndicator = () => <LoadingIndicator />;

  const getGoldPriceBody = () => (goldPrice ? getGoldPriceDetails() : getNoDataDetails());

  const getDataBody = () => (isLoading ? getLoadingIndicator() : getGoldPriceBody());

  const getDataActions = () => (
    <Button size="small" onClick={getCurrentGoldPrice}>
      {t("common.refresh")}
    </Button>
  );

  const getSnackbar = () => (
    <AppSnackbar isOpen={isSnackbarOpen} message={message} type="info" onClose={handleSnackbarClose} />
  );

  useEffect(() => {
    getCurrentGoldPrice();
  }, [getCurrentGoldPrice]);

  return (
    <GoldPricesCard
      title={t("nbp.currentGoldPrice")}
      body={getDataBody()}
      actions={getDataActions()}
      additional={getSnackbar()}
    />
  );
};

export default CurrentGoldPrice;

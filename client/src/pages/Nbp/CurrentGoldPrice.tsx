import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { GoldPriceDto } from "open-data-common";

import { ErrorSnackbar, LoadingIndicator } from "../../components";
import { nbpService } from "../../services/nbpService";

const CurrentGoldPrice: React.FC = () => {
  const [t] = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [goldPrice, setGoldPrice] = useState<GoldPriceDto | null>(null);

  const handleSnackbarOpen = (error: string | null) => {
    setErrorMessage(error);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setErrorMessage(null);
    setIsSnackbarOpen(false);
  };

  const getCurrentGoldPrice = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await nbpService().getCurrentGoldPrice();
      setGoldPrice(result);
    } catch (e) {
      handleSnackbarOpen(t("nbp.errors.cannotFetchCurrentGoldPrice"));
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

  useEffect(() => {
    getCurrentGoldPrice();
  }, [getCurrentGoldPrice]);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          {t("nbp.currentGoldPrice")}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {getDataBody()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={getCurrentGoldPrice}>
          {t("common.refresh")}
        </Button>
      </CardActions>
      <ErrorSnackbar isOpen={isSnackbarOpen} errorMessage={errorMessage} onClose={handleSnackbarClose} />
    </Card>
  );
};

export default CurrentGoldPrice;

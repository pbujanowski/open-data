import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { GoldPriceDto } from "open-data-common";

import { LoadingIndicator } from "../../components";
import NbpService from "../../services/nbp.service";

const CurrentGoldPrice: React.FC = () => {
  const [t] = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [goldPrice, setGoldPrice] = useState<GoldPriceDto | null>(null);

  useEffect(() => {
    getCurrentGoldPrice();
  }, []);

  const getCurrentGoldPrice = async () => {
    try {
      setIsLoading(true);
      const result = await NbpService.getCurrentGoldPrice();
      setGoldPrice(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
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
    </Card>
  );
};

export default CurrentGoldPrice;

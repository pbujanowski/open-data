import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { addDays } from "date-fns";

import { GoldPriceDto } from "open-data-common";

import GoldPricesCard from "./components/GoldPricesCard";
import GoldPricesTable from "./components/GoldPricesTable";

import { ErrorSnackbar, LoadingIndicator } from "../../components";
import { nbpService } from "../../services/nbpService";
import GoldPricesDatesActions from "./components/GoldPricesDatesActions";

const GoldPricesByDate: React.FC = () => {
  const [t] = useTranslation();
  const dateYesterday = addDays(new Date(Date.now()), -1).toDateString();
  const dateToday = new Date(Date.now()).toDateString();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [goldPrices, setGoldPrices] = useState<GoldPriceDto[] | null>(null);
  const [startDate, setStartDate] = useState<string>(dateYesterday);
  const [endDate, setEndDate] = useState<string>(dateToday);

  const handleStartDateChange = (date: string) => setStartDate(date);

  const handleEndDateChange = (date: string) => setEndDate(date);

  const handleSnackbarOpen = (error: string | null) => {
    setErrorMessage(error);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setErrorMessage(null);
    setIsSnackbarOpen(false);
  };

  const getGoldPricesByDate = async () => {
    try {
      setIsLoading(true);
      const result = await nbpService().getGoldPricesByDate(startDate, endDate);
      setGoldPrices(result);
    } catch (e) {
      handleSnackbarOpen(t("nbp.errors.cannotFetchGoldPricesByDate"));
    } finally {
      setIsLoading(false);
    }
  };

  const getGoldPricesDetails = () => <GoldPricesTable goldPrices={goldPrices} />;

  const getLoadingIndicator = () => <LoadingIndicator />;

  const getActionsBody = () => (
    <GoldPricesDatesActions
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={handleStartDateChange}
      onEndDateChange={handleEndDateChange}
      onSubmit={() => getGoldPricesByDate()}
    />
  );

  const getDataBody = () => (isLoading ? getLoadingIndicator() : getGoldPricesDetails());

  const getDataActions = () => (isLoading ? <></> : getActionsBody());

  const getErrorSnackbar = () => (
    <ErrorSnackbar isOpen={isSnackbarOpen} errorMessage={errorMessage} onClose={handleSnackbarClose} />
  );

  return (
    <GoldPricesCard
      title={t("nbp.goldPricesByDate")}
      body={getDataBody()}
      actions={getDataActions()}
      additional={getErrorSnackbar()}
    />
  );
};

export default GoldPricesByDate;

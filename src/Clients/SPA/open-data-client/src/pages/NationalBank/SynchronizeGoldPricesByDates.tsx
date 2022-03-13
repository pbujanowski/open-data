import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { addDays } from "date-fns";
import { Button } from "@mui/material";

import { GoldPricesCard, GoldPricesDates } from "./components";

import { AppSnackbar, AppSnackbarType, LoadingIndicator } from "../../components";
import { nationalBankService } from "../../services";

const SynchronizeGoldPricesByDates: React.FC = () => {
  const [t] = useTranslation();
  const dateYesterday = addDays(new Date(Date.now()), -1).toDateString();
  const dateToday = new Date(Date.now()).toDateString();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<AppSnackbarType | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>(dateYesterday);
  const [endDate, setEndDate] = useState<string>(dateToday);

  const handleStartDateChange = (date: string) => setStartDate(date);

  const handleEndDateChange = (date: string) => setEndDate(date);

  const handleSnackbarOpen = (message: string | null, type: AppSnackbarType) => {
    setMessage(message);
    setSnackbarType(type);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setMessage(null);
    setSnackbarType(null);
    setIsSnackbarOpen(false);
  };

  const synchronizeGoldPricesByDates = async () => {
    try {
      setIsLoading(true);
      await nationalBankService().synchronizeGoldPricesByDates(startDate, endDate);
      handleSnackbarOpen(t("nationalBank.messages.synchronizedGoldPricesByDatesProperly"), "success");
    } catch (e) {
      handleSnackbarOpen(t("nationalBank.messages.cannotSynchronizeGoldPricesByDates"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getLoadingIndicator = () => <LoadingIndicator />;

  const getActionsBody = () => (
    <Button size="small" onClick={synchronizeGoldPricesByDates}>
      {t("common.synchronize")}
    </Button>
  );

  const getDataBody = () =>
    isLoading ? (
      getLoadingIndicator()
    ) : (
      <GoldPricesDates
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
    );

  const getDataActions = () => (isLoading ? <></> : getActionsBody());

  const getSnackbar = () => (
    <AppSnackbar
      isOpen={isSnackbarOpen}
      message={message}
      type={snackbarType || "info"}
      onClose={handleSnackbarClose}
    />
  );

  return (
    <GoldPricesCard
      title={t("nationalBank.synchronizeGoldPricesByDates")}
      body={getDataBody()}
      actions={getDataActions()}
      additional={getSnackbar()}
    />
  );
};

export default SynchronizeGoldPricesByDates;

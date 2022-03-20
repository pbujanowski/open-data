import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { GoldPricesDates } from "./components";

import { AppSnackbar, DataCard, LoadingIndicator } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  synchronizeGoldPricesByDates,
  selectSynchronizeGoldPricesByDatesState,
  setSynchronizeGoldPricesByDatesStartDate,
  setSynchronizeGoldPricesByDatesEndDate,
} from "slices";

const SynchronizeGoldPricesByDates: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const message = t("nationalBank.messages.cannotSynchronizeGoldPricesByDates");
  const { dates, isLoading, isError } = useAppSelector(selectSynchronizeGoldPricesByDatesState);

  const handleStartDateChange = (date: string) => {
    dispatch(setSynchronizeGoldPricesByDatesStartDate(date));
  };

  const handleEndDateChange = (date: string) => {
    dispatch(setSynchronizeGoldPricesByDatesEndDate(date));
  };

  const handleSynchronizeGoldPricesByDates = async () => {
    await dispatch(synchronizeGoldPricesByDates(dates));
  };

  const getLoadingIndicator = () => <LoadingIndicator />;

  const getActionsBody = () => (
    <Button size="small" onClick={handleSynchronizeGoldPricesByDates}>
      {t("common.synchronize")}
    </Button>
  );

  const getDataBody = () =>
    isLoading ? (
      getLoadingIndicator()
    ) : (
      <GoldPricesDates
        startDate={dates.startDate}
        endDate={dates.endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
    );

  const getDataActions = () => (isLoading ? <></> : getActionsBody());

  const getSnackbar = () => <AppSnackbar isOpen={isError || false} message={message} type="error" />;

  return (
    <DataCard
      title={t("nationalBank.synchronizeGoldPricesByDates")}
      body={getDataBody()}
      actions={getDataActions()}
      additional={getSnackbar()}
    />
  );
};

export default SynchronizeGoldPricesByDates;

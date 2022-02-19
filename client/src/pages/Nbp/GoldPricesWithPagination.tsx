import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { GoldPriceDto } from "open-data-common";

import GoldPricesCard from "./components/GoldPricesCard";
import GoldPricesPagination from "./components/GoldPricesPagination";
import GoldPricesTable from "./components/GoldPricesTable";

import { AppSnackbar, LoadingIndicator } from "../../components";
import { nbpService } from "../../services/nbpService";

const GoldPricesWithPagination: React.FC = () => {
  const [t] = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [goldPrices, setGoldPrices] = useState<GoldPriceDto[] | null>(null);
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

  const handlePageNumberChange = async (pageNumber: number) => {
    setPageNumber(pageNumber);
    await getGoldPricesWithPagination();
  };

  const handlePageSizeChange = (pageSize: number) => setPageSize(pageSize);

  const getGoldPricesWithPagination = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await nbpService().getGoldPricesWithPagination(pageNumber, pageSize);
      setGoldPrices(result);
    } catch (e) {
      handleSnackbarOpen(t("nbp.messages.cannotFetchGoldPricesWithPagination"));
    } finally {
      setIsLoading(false);
    }
  }, [pageNumber, pageSize, t]);

  const getGoldPricesDetails = () => <GoldPricesTable goldPrices={goldPrices} />;

  const getLoadingIndicator = () => <LoadingIndicator />;

  const getActionsBody = () =>
    goldPrices && goldPrices?.length > 0 ? (
      <GoldPricesPagination
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageNumberChange={handlePageNumberChange}
        onPageSizeChange={handlePageSizeChange}
      />
    ) : (
      <></>
    );

  const getDataBody = () => (isLoading ? getLoadingIndicator() : getGoldPricesDetails());

  const getDataActions = () => (isLoading ? <></> : getActionsBody());

  const getErrorSnackbar = () => (
    <AppSnackbar isOpen={isSnackbarOpen} message={errorMessage} type="error" onClose={handleSnackbarClose} />
  );

  useEffect(() => {
    nbpService()
      .getGoldPricesCount()
      .then((goldPricesCount) => {
        setTotalCount(goldPricesCount.count);
      });

    getGoldPricesWithPagination();
  }, [getGoldPricesWithPagination, pageSize]);

  return (
    <GoldPricesCard
      title={t("nbp.goldPricesWithPagination")}
      body={getDataBody()}
      actions={getDataActions()}
      additional={getErrorSnackbar()}
    />
  );
};

export default GoldPricesWithPagination;

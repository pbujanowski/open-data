import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { addDays, format } from "date-fns";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import { GoldPriceDto } from "open-data-common";

import { ErrorSnackbar, LoadingIndicator } from "../../components";
import NbpService from "../../services/nbp.service";

const GoldPricesByDate: React.FC = () => {
  const [t] = useTranslation();
  const dateFormat = "yyyy-MM-dd";
  const dateMask = "____-__-__";
  const dateToday = format(Date.now(), dateFormat);
  const dateYesterday = format(addDays(new Date(dateToday), -1), dateFormat);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [goldPrices, setGoldPrices] = useState<GoldPriceDto[] | null>(null);
  const [startDate, setStartDate] = useState<string>(dateYesterday);
  const [endDate, setEndDate] = useState<string>(dateToday);

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
      const result = await NbpService.getGoldPricesByDate(startDate, endDate);
      setGoldPrices(result);
    } catch (e) {
      handleSnackbarOpen(t("nbp.errors.cannotFetchGoldPricesByDate"));
    } finally {
      setIsLoading(false);
    }
  };

  const getGoldPricesDetails = () => (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("goldPrice.date")}</TableCell>
            <TableCell>{t("goldPrice.price")} zł</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goldPrices?.map((goldPrice) => (
            <TableRow key={uuid()}>
              <TableCell>{goldPrice.date}</TableCell>
              <TableCell>{goldPrice.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const getNoDataDetails = () => (
    <p>
      <strong>{`${t("common.noData")}.`}</strong>
    </p>
  );

  const getLoadingIndicator = () => <LoadingIndicator />;

  const getGoldPricesBody = () => (goldPrices ? getGoldPricesDetails() : getNoDataDetails());

  const getActionsBody = () => (
    <>
      <CardActions>
        <DatePicker
          inputFormat={dateFormat}
          mask={dateMask}
          renderInput={(props) => <TextField {...props} />}
          label={t("goldPrice.startDate")}
          value={startDate}
          onChange={(value) => handleStartDateChange(value || dateToday)}
        />
        <DatePicker
          inputFormat={dateFormat}
          mask={dateMask}
          renderInput={(props) => <TextField {...props} />}
          label={t("goldPrice.endDate")}
          value={endDate}
          onChange={(value) => handleEndDateChange(value || dateToday)}
        />
      </CardActions>
      <CardActions>
        <Button size="small" onClick={getGoldPricesByDate}>
          {t("common.download")}
        </Button>
      </CardActions>
    </>
  );

  const getDataBody = () => (isLoading ? getLoadingIndicator() : getGoldPricesBody());

  const getDataActions = () => (isLoading ? <></> : getActionsBody());

  const handleStartDateChange = (date: string) => setStartDate(date);

  const handleEndDateChange = (date: string) => setEndDate(date);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {t("nbp.goldPricesByDate")}
        </Typography>
        {getDataBody()}
      </CardContent>
      {getDataActions()}
      <ErrorSnackbar isOpen={isSnackbarOpen} errorMessage={errorMessage} onClose={handleSnackbarClose} />
    </Card>
  );
};

export default GoldPricesByDate;

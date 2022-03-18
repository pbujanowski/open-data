import React from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { ExchangeRateDto } from "dtos";
import { NoData } from "components";

export type ExchangeRatesTableProps = {
  exchangeRates: ExchangeRateDto[] | null;
};

const ExchangeRatesTable: React.FC<ExchangeRatesTableProps> = ({ exchangeRates }) => {
  const [t] = useTranslation();

  const getNoDataDetails = () => <NoData />;

  const getExchangeRatesTable = () => (
    <TableContainer sx={{ maxHeight: 250 }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>{t("exchangeRate.currency")}</TableCell>
            <TableCell>{t("exchangeRate.code")}</TableCell>
            <TableCell>{t("exchangeRate.mid")}</TableCell>
            <TableCell>{t("exchangeRate.bid")}</TableCell>
            <TableCell>{t("exchangeRate.ask")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchangeRates?.map((exchangeRate) => (
            <TableRow key={uuid()}>
              <TableCell>{exchangeRate.currency}</TableCell>
              <TableCell>{exchangeRate.code}</TableCell>
              <TableCell>{exchangeRate.mid || "-"}</TableCell>
              <TableCell>{exchangeRate.bid || "-"}</TableCell>
              <TableCell>{exchangeRate.ask || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return exchangeRates && exchangeRates.length > 0 ? <>{getExchangeRatesTable()}</> : <>{getNoDataDetails()}</>;
};

export default ExchangeRatesTable;

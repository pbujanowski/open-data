import React from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { GoldPriceDto } from "open-data-common";

type GoldPricesTableProps = {
  goldPrices: GoldPriceDto[] | null;
};

const GoldPricesTable: React.FC<GoldPricesTableProps> = ({ goldPrices }) => {
  const [t] = useTranslation();
  const dateFormat = "yyyy-MM-dd";

  const getNoDataDetails = () => (
    <p>
      <strong>{`${t("common.noData")}.`}</strong>
    </p>
  );

  const getGoldPricesTable = () => (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("goldPrice.date")}</TableCell>
            <TableCell>{t("goldPrice.price")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goldPrices?.map((goldPrice) => (
            <TableRow key={goldPrice.id || uuid()}>
              <TableCell>{format(new Date(goldPrice.date), dateFormat)}</TableCell>
              <TableCell>{goldPrice.price.toFixed(2)} zł</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return goldPrices && goldPrices.length > 0 ? <>{getGoldPricesTable()}</> : <>{getNoDataDetails()}</>;
};

export default GoldPricesTable;

import React from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import {
  Grid,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GoldPriceDto } from "open-data-common";

type GoldPricesTableProps = {
  goldPrices: GoldPriceDto[] | null;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  onPageNumberChange: (pageNumber: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

const GoldPricesTable: React.FC<GoldPricesTableProps> = ({
  goldPrices,
  pageNumber,
  pageSize,
  totalCount,
  onPageNumberChange,
  onPageSizeChange,
}) => {
  const [t] = useTranslation();
  const dateFormat = "yyyy-MM-dd";

  const getNoDataDetails = () => (
    <p>
      <strong>{`${t("common.noData")}.`}</strong>
    </p>
  );

  const pageSizes = [10, 25, 50, 100];

  const getGoldPricesTable = () => (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TableContainer sx={{ maxHeight: 250 }}>
          <Table size="small" stickyHeader>
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
      </Grid>
      <Grid container item direction="row" alignItems="center">
        <Grid item>
          <Pagination
            onChange={(_event, page) => onPageNumberChange(page)}
            page={pageNumber}
            count={Math.round(totalCount / pageSize)}
            showFirstButton
            showLastButton
          />
        </Grid>
        <Grid item>
          <Select value={pageSize} onChange={(event) => onPageSizeChange(event.target.value as number)} size="small">
            {pageSizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );

  return goldPrices && goldPrices.length > 0 ? <>{getGoldPricesTable()}</> : <>{getNoDataDetails()}</>;
};

export default GoldPricesTable;

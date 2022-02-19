import React from "react";
import { useTranslation } from "react-i18next";
import { LabelDisplayedRowsArgs, TablePagination } from "@mui/material";

type GoldPricesPaginationProps = {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  onPageNumberChange: (pageNumber: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

const GoldPricesPagination: React.FC<GoldPricesPaginationProps> = ({
  pageNumber,
  pageSize,
  totalCount,
  onPageNumberChange,
  onPageSizeChange,
}) => {
  const [t] = useTranslation();

  const getLabelDisplayedRows = (paginationInfo: LabelDisplayedRowsArgs) => {
    return `${paginationInfo.from}–${paginationInfo.to} ${t("table.of")} ${
      paginationInfo.count !== -1 ? paginationInfo.count : `${t("table.moreThan")} ${paginationInfo.to}`
    }`;
  };

  return (
    <TablePagination
      onPageChange={(_event, page) => onPageNumberChange(page)}
      onRowsPerPageChange={(event) => onPageSizeChange(Number.parseInt(event.target.value || "0"))}
      page={pageNumber - 1}
      rowsPerPage={pageSize}
      count={totalCount}
      labelDisplayedRows={getLabelDisplayedRows}
      showFirstButton
      showLastButton
    />
  );
};

export default GoldPricesPagination;

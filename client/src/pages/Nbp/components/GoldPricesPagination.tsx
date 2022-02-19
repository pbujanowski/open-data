import React from "react";
import { Pagination } from "@mui/material";

type GoldPricesPaginationProps = {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  onPageNumberChange: (pageNumber: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

const GoldPricesPagination: React.FC<GoldPricesPaginationProps> = ({
  pageNumber,
  pageSize,
  pageCount,
  onPageNumberChange,
  onPageSizeChange,
}) => {
  return <Pagination onChange={(_event, page) => onPageNumberChange(page)} page={pageNumber} count={pageCount} />;
};

export default GoldPricesPagination;

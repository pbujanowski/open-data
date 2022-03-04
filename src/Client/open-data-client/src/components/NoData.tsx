import React from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const NoData: React.FC = () => {
  const [t] = useTranslation();

  return <Typography>{t("common.noData")}</Typography>;
};

export default NoData;

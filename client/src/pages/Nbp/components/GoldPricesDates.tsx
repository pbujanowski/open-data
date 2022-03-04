import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";

import { appConstants, dateUtils } from "../../../utils";

type GoldPricesDatesProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
};

const GoldPricesDates: React.FC<GoldPricesDatesProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [t] = useTranslation();
  const { addDaysFromNow, toDateString } = dateUtils();
  const dateFormat = appConstants().getDateFormat();
  const dateMask = appConstants().getDateMask();
  const dateYesterday = toDateString(addDaysFromNow(-1));
  const dateToday = toDateString(Date.now());

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item>
        <DatePicker
          inputFormat={dateFormat}
          mask={dateMask}
          renderInput={(props) => <TextField size="small" {...props} />}
          label={t("goldPrice.startDate")}
          value={startDate}
          onChange={(value) => onStartDateChange(value || dateYesterday)}
        />
      </Grid>
      <Grid item>
        <DatePicker
          inputFormat={dateFormat}
          mask={dateMask}
          renderInput={(props) => <TextField size="small" {...props} />}
          label={t("goldPrice.endDate")}
          value={endDate}
          onChange={(value) => onEndDateChange(value || dateToday)}
        />
      </Grid>
    </Grid>
  );
};

export default GoldPricesDates;

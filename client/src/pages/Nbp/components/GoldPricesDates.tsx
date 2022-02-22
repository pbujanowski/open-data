import React from "react";
import { useTranslation } from "react-i18next";
import { addDays, format } from "date-fns";
import { Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";

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
  const dateFormat = "yyyy-MM-dd";
  const dateMask = "____-__-__";
  const dateYesterday = format(addDays(Date.now(), -1), dateFormat);
  const dateToday = format(Date.now(), dateFormat);

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

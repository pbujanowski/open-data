import React from "react";
import { useTranslation } from "react-i18next";
import { addDays, format } from "date-fns";
import { Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";

type GoldPricesDatesActionsProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onSubmit: React.MouseEventHandler<HTMLElement>;
};

const GoldPricesDatesActions: React.FC<GoldPricesDatesActionsProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
}) => {
  const [t] = useTranslation();
  const dateFormat = "yyyy-MM-dd";
  const dateMask = "____-__-__";
  const dateYesterday = format(addDays(Date.now(), -1), dateFormat);
  const dateToday = format(Date.now(), dateFormat);

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <DatePicker
              inputFormat={dateFormat}
              mask={dateMask}
              renderInput={(props) => <TextField {...props} />}
              label={t("goldPrice.startDate")}
              value={startDate}
              onChange={(value) => onStartDateChange(value || dateYesterday)}
            />
          </Grid>
          <Grid item>
            <DatePicker
              inputFormat={dateFormat}
              mask={dateMask}
              renderInput={(props) => <TextField {...props} />}
              label={t("goldPrice.endDate")}
              value={endDate}
              onChange={(value) => onEndDateChange(value || dateToday)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button size="small" onClick={onSubmit}>
          {t("common.download")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default GoldPricesDatesActions;

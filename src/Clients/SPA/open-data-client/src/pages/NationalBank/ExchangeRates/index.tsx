import React from "react";
import { Grid } from "@mui/material";

import CurrentExchangeRates from "./CurrentExchangeRates";

const ExchangeRates: React.FC = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid container item direction="row" spacing={2}>
        <Grid item xs>
          <CurrentExchangeRates />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExchangeRates;

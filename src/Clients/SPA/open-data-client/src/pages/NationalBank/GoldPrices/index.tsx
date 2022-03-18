import React from "react";
import { Grid } from "@mui/material";

import CurrentGoldPrice from "./CurrentGoldPrice";
import GoldPricesWithFilters from "./GoldPricesWithFilters";
import SynchronizeGoldPricesByDates from "./SynchronizeGoldPricesByDates";

const GoldPrices: React.FC = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid container item direction="row" spacing={2}>
        <Grid item xs>
          <CurrentGoldPrice />
        </Grid>
        <Grid item xs>
          <SynchronizeGoldPricesByDates />
        </Grid>
      </Grid>
      <Grid container item>
        <GoldPricesWithFilters />
      </Grid>
    </Grid>
  );
};

export default GoldPrices;

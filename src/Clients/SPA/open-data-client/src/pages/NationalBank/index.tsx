import React from "react";
import { Box, Grid } from "@mui/material";

import CurrentGoldPrice from "./CurrentGoldPrice";
import GoldPricesWithFilters from "./GoldPricesWithFilters";
import SynchronizeGoldPricesByDates from "./SynchronizeGoldPricesByDates";

const NationalBank: React.FC = () => {
  return (
    <Box sx={{ width: 1, height: 1, m: 3 }}>
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
    </Box>
  );
};

export default NationalBank;

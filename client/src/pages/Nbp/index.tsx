import React from "react";
import { Box, Grid } from "@mui/material";

import CurrentGoldPrice from "./CurrentGoldPrice";
import GoldPricesWithPagination from "./GoldPricesWithPagination";
import SynchronizeGoldPricesByDates from "./SynchronizeGoldPricesByDates";

const Nbp: React.FC = () => {
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
          <GoldPricesWithPagination />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Nbp;

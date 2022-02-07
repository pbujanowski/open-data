import React from "react";
import { Box, Grid } from "@mui/material";

import CurrentGoldPrice from "./CurrentGoldPrice";
import GoldPricesByDate from "./GoldPricesByDate";

const Nbp: React.FC = () => {
  return (
    <Box sx={{ width: "100%", m: 3 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <CurrentGoldPrice />
        </Grid>
        <Grid item xs={6}>
          <GoldPricesByDate />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Nbp;

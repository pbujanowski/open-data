import React from "react";
import { Box, Grid } from "@mui/material";

import NbpQuickStart from "./NbpQuickStart";

const Home: React.FC = () => {
  return (
    <Box sx={{ width: "100%", m: 3 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item sx={{ width: "100%" }}>
          <NbpQuickStart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

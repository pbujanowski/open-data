import React from "react";
import { Box } from "@mui/material";

import NbpQuickStart from "./NbpQuickStart";

const Home: React.FC = () => {
  return (
    <Box sx={{ width: 1, height: 1, m: 3 }}>
      <NbpQuickStart />
    </Box>
  );
};

export default Home;

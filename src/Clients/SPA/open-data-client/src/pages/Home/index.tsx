import React from "react";
import { Box } from "@mui/material";

import NationalBankQuickStart from "./NationalBankQuickStart";

const Home: React.FC = () => {
  return (
    <Box sx={{ width: 1, height: 1, m: 3 }}>
      <NationalBankQuickStart />
    </Box>
  );
};

export default Home;

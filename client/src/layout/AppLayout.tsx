import React from "react";
import { CssBaseline } from "@mui/material";

import Header from "./Header";

const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Header />
      {children}
    </>
  );
};

export default AppLayout;

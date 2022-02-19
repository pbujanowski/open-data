import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingIndicator: React.FC = () => {
  return <CircularProgress sx={{ alignContent: "center" }} />;
};

export default LoadingIndicator;

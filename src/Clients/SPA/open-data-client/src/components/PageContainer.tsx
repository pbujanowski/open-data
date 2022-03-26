import React from "react";
import { Box } from "@mui/material";

type PageContainerProps = {
  page: React.ElementType;
};

const PageContainer: React.FC<PageContainerProps> = ({ page }) => {
  return <Box sx={{ width: 1, height: 1, m: 3 }}>{React.createElement(page)}</Box>;
};

export default PageContainer;

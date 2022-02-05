import React from "react";
import { Container } from "@mui/material";

type PageContainerProps = {
  page: React.ElementType;
};

const PageContainer: React.FC<PageContainerProps> = ({ page }) => {
  return <Container>{React.createElement(page)}</Container>;
};

export default PageContainer;

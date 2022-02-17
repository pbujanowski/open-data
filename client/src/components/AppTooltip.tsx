import React from "react";
import { Tooltip, TooltipProps, Typography } from "@mui/material";

type AppTooltipProps = TooltipProps;

const AppTooltip: React.FC<AppTooltipProps> = ({ title, placement, children }) => {
  return (
    <Tooltip title={<Typography variant="subtitle2">{title}</Typography>} placement={placement}>
      {children}
    </Tooltip>
  );
};

export default AppTooltip;

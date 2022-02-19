import React from "react";

import { Card, CardActions, CardContent, Typography } from "@mui/material";

type GoldPricesCardProps = {
  title: string;
  body: JSX.Element;
  actions?: JSX.Element;
  additional?: JSX.Element;
};

const GoldPricesCard: React.FC<GoldPricesCardProps> = ({ title, body, actions, additional }) => {
  const getActions = () => <CardActions>{actions}</CardActions>;

  return (
    <Card sx={{ width: 1, height: 1 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {body}
        </Typography>
      </CardContent>
      {getActions()}
      {additional}
    </Card>
  );
};

export default GoldPricesCard;

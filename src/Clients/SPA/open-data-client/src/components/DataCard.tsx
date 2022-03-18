import React from "react";

import { Card, CardActions, CardContent, Typography } from "@mui/material";

export type DataCardProps = {
  title: string | JSX.Element;
  body: JSX.Element;
  actions?: JSX.Element;
  additional?: JSX.Element;
};

const DataCard: React.FC<DataCardProps> = ({ title, body, actions, additional }) => {
  const getActions = () => <CardActions>{actions}</CardActions>;

  return (
    <Card sx={{ width: 1, height: 1 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" color="primary">
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

export default DataCard;

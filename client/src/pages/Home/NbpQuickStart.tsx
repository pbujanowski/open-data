import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { nbpRoute } from "../../routes";

const NbpQuickStart: React.FC = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => navigate(path);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography align="center" gutterBottom variant="h5" component="div" color="primary">
          {t("pages.nbp")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ width: "100%" }} variant="outlined" size="large" onClick={() => handleNavigate(nbpRoute.path)}>
          {t("common.go")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default NbpQuickStart;

import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  AppBarProps,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

import { AppTooltip } from "../components";
import { LanguageSwitcher } from "./components";
import { ThemeSwitcher } from "../theme";
import { menuRoutes } from "../routes";

import logo from "../assets/logo.svg";

const DrawerHeaderStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== "open" })(() => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
}));

const AppLayout: React.FC = ({ children }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <Toolbar>
          <Box sx={{ flex: 0, maxHeight: 64 }} component="img" src={logo} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" noWrap component="div">
              {t("brand")}
            </Typography>
          </Box>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent">
        <DrawerHeaderStyled />
        <Divider />
        <List>
          {menuRoutes.map((route) => {
            const title = t(`pages.${route.key}`);
            return (
              <AppTooltip title={title} placement="right">
                <ListItem>
                  <ListItemButton key={route.key} onClick={() => navigate(route.path)}>
                    {React.createElement(route.icon || React.Fragment)}
                  </ListItemButton>
                </ListItem>
              </AppTooltip>
            );
          })}
        </List>
      </DrawerStyled>
      <Box component="main" sx={{ paddingLeft: 8 }}>
        <DrawerHeaderStyled />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;

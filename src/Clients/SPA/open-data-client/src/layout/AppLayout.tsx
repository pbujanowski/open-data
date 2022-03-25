import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
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

import { AppTooltip } from "components";
import { LanguageSwitcher, UserMenu } from "./components";
import { ThemeSwitcher } from "theme";
import { menuRoutes } from "routes";

import logo from "assets/logo.svg";

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
  const location = useLocation();
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
          <UserMenu />
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
              <AppTooltip key={route.key} title={title} placement="right">
                <ListItem>
                  <ListItemButton selected={location.pathname === route.path} onClick={() => navigate(route.path)}>
                    {React.createElement(route.icon || React.Fragment)}
                  </ListItemButton>
                </ListItem>
              </AppTooltip>
            );
          })}
        </List>
      </DrawerStyled>
      <Box component="main" sx={{ width: 1, height: 1, paddingLeft: 9, paddingRight: 3 }}>
        <DrawerHeaderStyled />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;

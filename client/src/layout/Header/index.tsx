import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

import { ThemeSwitcher } from "../../theme";
import { menuRoutes } from "../../routes";

const Header: React.FC = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleNavigate = (path: string) => navigate(path);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavItemClick = (path: string) => {
    handleNavigate(path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            {t("brand")}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menuRoutes.map((route) => {
                return (
                  <MenuItem key={route.key} LinkComponent={Button} onClick={() => handleNavItemClick(route.path)}>
                    <Typography textAlign="center">{t(`pages.${route.key}`)}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {t("brand")}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menuRoutes.map((route) => (
              <Button
                key={route.key}
                onClick={() => handleNavItemClick(route.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t(`pages.${route.key}`)}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ThemeSwitcher />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

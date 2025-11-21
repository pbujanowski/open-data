import { useState } from 'react';
import { Box, Button, Drawer, IconButton, Stack } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { NavigationItemViewModel } from '../models/NavigationItemViewModel';

export interface MobileNavigationProps {
  navigationItems: NavigationItemViewModel[];
}

export const MobileNavigation = ({
  navigationItems,
}: MobileNavigationProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <IconButton
        data-testid="menu-button"
        color="inherit"
        edge="start"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        data-testid="menu-drawer"
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Stack>
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                data-testid={`menu-item-${item.label}`}
                sx={{ justifyContent: 'flex-start' }}
                color="inherit"
                component={Link}
                to={item.to}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Drawer>
      <AppHeader data-testid="app-header" />
    </>
  );
};

import { useState } from 'react';
import { Box, Button, Drawer, IconButton, Stack } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { NavigationItemViewModel } from '../models/NavigationItemViewModel';

interface MobileNavigationProps {
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
      <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
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
      <AppHeader />
    </>
  );
};

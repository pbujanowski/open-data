import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { NavigationItemViewModel } from '../models/NavigationItemViewModel';

interface StandardNavigationProps {
  navigationItems: NavigationItemViewModel[];
}

export const StandardNavigation = ({
  navigationItems,
}: StandardNavigationProps) => {
  return (
    <>
      <AppHeader data-testid="app-header" />
      <Box data-testid="navigation-box">
        {navigationItems.map((item) => (
          <Button
            key={item.label}
            data-testid={`menu-item-${item.label}`}
            color="inherit"
            component={Link}
            to={item.to}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </>
  );
};

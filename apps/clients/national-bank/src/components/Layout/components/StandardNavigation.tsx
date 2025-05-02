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
      <AppHeader />
      <Box>
        {navigationItems.map((item) => (
          <Button
            key={item.label}
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

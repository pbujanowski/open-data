import { Typography } from '@mui/material';

export const AppHeader = () => {
  return (
    <Typography
      data-testid="app-header"
      variant="h6"
      component="div"
      sx={{ flexGrow: 1 }}
    >
      Open Data
    </Typography>
  );
};

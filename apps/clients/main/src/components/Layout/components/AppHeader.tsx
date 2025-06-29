import { Typography, Box } from '@mui/material';

export const AppHeader = () => {
  return (
    <Box display="flex" alignItems="center" data-testid="app-header">
      <img
        src="/favicon.svg"
        alt="Open Data Logo"
        style={{ width: 32, height: 32, marginRight: 12 }}
        data-testid="app-header-logo"
      />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Open Data
      </Typography>
    </Box>
  );
};

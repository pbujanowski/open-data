import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { TabItemModel } from './models/TabItemModel';

export interface LayoutProps {
  tabItems: TabItemModel[];
  children: React.ReactNode;
}

export const Layout = ({ tabItems, children }: LayoutProps) => {
  const location = useLocation();
  const currentTab = tabItems.findIndex((tab) => tab.to === location.pathname);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<'light' | 'dark'>(
    ((localStorage.getItem('theme-mode') ?? prefersDarkMode)
      ? 'dark'
      : 'light') as 'light' | 'dark',
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  useEffect(() => {
    const handleThemeChanged = (event: Event) => {
      if (event.type === 'themeChanged') {
        const newMode = localStorage.getItem('theme-mode');
        if (newMode) {
          setMode(newMode as 'light' | 'dark');
        }
      }
    };

    window.addEventListener('themeChanged', handleThemeChanged);

    return () => {
      window.removeEventListener('themeChanged', handleThemeChanged);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Tabs
          sx={{
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
          value={currentTab === -1 ? 0 : currentTab}
          indicatorColor="primary"
          textColor="primary"
        >
          {tabItems.length === 0 ? (
            <Tab label="No Tabs" disabled />
          ) : (
            tabItems.map((tab, idx) => (
              <Tab
                key={tab.to}
                label={tab.label}
                component={Link}
                to={tab.to}
                value={idx}
                sx={{ color: 'text.primary' }}
              />
            ))
          )}
        </Tabs>
        <Box>{children}</Box>
      </Container>
    </ThemeProvider>
  );
};

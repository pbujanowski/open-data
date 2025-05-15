import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  Toolbar,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const tabRoutes = [{ label: 'Home', to: '/dashboard' }];

  const location = useLocation();
  const currentTab = tabRoutes.findIndex((tab) => tab.to === location.pathname);

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
        <Toolbar />
        <Tabs
          value={currentTab === -1 ? 0 : currentTab}
          indicatorColor="primary"
          textColor="primary"
        >
          {tabRoutes.map((tab, idx) => (
            <Tab
              key={tab.to}
              label={tab.label}
              component={Link}
              to={tab.to}
              value={idx}
            />
          ))}
        </Tabs>
        <Box>{children}</Box>
      </Container>
    </ThemeProvider>
  );
};

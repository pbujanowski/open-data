import React, { useState, useMemo, useEffect } from 'react';
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MobileNavigation } from './components/MobileNavigation';
import { StandardNavigation } from './components/StandardNavigation';
import { NavigationItemViewModel } from './models/NavigationItemViewModel';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigationItems: NavigationItemViewModel[] = [
    { label: 'Dashboard', to: '/' },
    { label: 'National Bank', to: '/national-bank' },
  ];

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light',
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

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
    dispatchEvent(new Event('themeChanged'));
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          {useMediaQuery(theme.breakpoints.down('sm')) ? (
            <MobileNavigation navigationItems={navigationItems} />
          ) : (
            <StandardNavigation navigationItems={navigationItems} />
          )}
          <IconButton
            data-testid="theme-toggle-button"
            color="inherit"
            onClick={toggleTheme}
            sx={{ marginLeft: 'auto' }}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 2 }} maxWidth="xl">
        {children}
      </Container>
    </ThemeProvider>
  );
};

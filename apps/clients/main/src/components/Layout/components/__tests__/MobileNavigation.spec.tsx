import { ThemeProvider, createTheme } from '@mui/material/styles';
import { page } from '@vitest/browser/context';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { BrowserRouter } from 'react-router-dom';
import { MobileNavigation } from '../MobileNavigation';

describe('MobileNavigation', () => {
  const mockNavigationItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const renderWithProviders = (component: React.ReactNode) => {
    const theme = createTheme();
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>,
    );
  };

  it('renders the menu icon button', async () => {
    renderWithProviders(
      <MobileNavigation navigationItems={mockNavigationItems} />,
    );

    const menuButton = page.getByTestId('menu-button');
    await expect.element(menuButton).toBeInTheDocument();
  });

  it('opens the drawer when the menu icon is clicked', async () => {
    renderWithProviders(
      <MobileNavigation navigationItems={mockNavigationItems} />,
    );

    const menuButton = page.getByTestId('menu-button');
    await menuButton.click();

    const drawer = page.getByTestId('menu-drawer');
    await expect.element(drawer).toBeInTheDocument();
  });

  it('renders navigation items inside the drawer', async () => {
    renderWithProviders(
      <MobileNavigation navigationItems={mockNavigationItems} />,
    );

    const menuButton = page.getByTestId('menu-button');
    await menuButton.click();

    for (const item of mockNavigationItems) {
      const navButton = page.getByTestId(`menu-item-${item.label}`);
      await expect.element(navButton).toBeInTheDocument();
    }
  });

  it('renders the AppHeader component', async () => {
    renderWithProviders(
      <MobileNavigation navigationItems={mockNavigationItems} />,
    );

    const appHeader = page.getByTestId('app-header');
    await expect.element(appHeader).toBeInTheDocument();
  });
});

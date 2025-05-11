import { page } from '@vitest/browser/context';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StandardNavigation } from '../StandardNavigation';

describe('StandardNavigation', () => {
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

  it('renders the AppHeader component', async () => {
    renderWithProviders(
      <StandardNavigation navigationItems={mockNavigationItems} />,
    );

    const appHeader = page.getByTestId('app-header');
    await expect.element(appHeader).toBeInTheDocument();
  });

  it('renders the navigation items', async () => {
    renderWithProviders(
      <StandardNavigation navigationItems={mockNavigationItems} />,
    );

    for (const item of mockNavigationItems) {
      const navButton = page.getByTestId(`menu-item-${item.label}`);
      await expect.element(navButton).toBeInTheDocument();
      await expect.element(navButton).toHaveTextContent(item.label);
    }
  });

  it('sets the correct "to" attribute for navigation links', async () => {
    renderWithProviders(
      <StandardNavigation navigationItems={mockNavigationItems} />,
    );

    for (const item of mockNavigationItems) {
      const navButton = page.getByTestId(`menu-item-${item.label}`);
      await expect.element(navButton).toHaveAttribute('href', item.to);
    }
  });
});

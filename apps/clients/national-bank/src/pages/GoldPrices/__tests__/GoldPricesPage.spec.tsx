import { page } from '@vitest/browser/context';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoldPricesPage } from '../GoldPricesPage';

describe('GoldPricesPage', () => {
  const queryClient = new QueryClient();

  const renderWithProviders = (component: React.ReactNode) => {
    render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>,
    );
  };

  it('should render the CurrentGoldPrice component', async () => {
    renderWithProviders(<GoldPricesPage />);
    const currentGoldPrice = page.getByText('Current Gold Price');
    expect(currentGoldPrice).toBeInTheDocument();
  });

  it('should render the LastGoldPrices component', async () => {
    renderWithProviders(<GoldPricesPage />);
    const lastGoldPrices = page.getByText('Last Gold Prices');
    expect(lastGoldPrices).toBeInTheDocument();
  });

  it('should render the TodayGoldPrice component', async () => {
    renderWithProviders(<GoldPricesPage />);
    const todayGoldPrice = page.getByText("Today's Gold Price");
    expect(todayGoldPrice).toBeInTheDocument();
  });

  it('should render the GoldPriceByDate component', async () => {
    renderWithProviders(<GoldPricesPage />);
    const goldPriceByDate = page.getByText('Gold Price by Date');
    expect(goldPriceByDate).toBeInTheDocument();
  });

  it('should render the GoldPricesByDateRange component', async () => {
    renderWithProviders(<GoldPricesPage />);
    const goldPricesByDateRange = page.getByText('Gold Prices by Date Range');
    expect(goldPricesByDateRange).toBeInTheDocument();
  });
});

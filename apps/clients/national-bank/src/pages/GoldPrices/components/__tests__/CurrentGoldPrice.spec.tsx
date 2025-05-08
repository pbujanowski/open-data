import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from '@vitest/browser/context';
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from '@tanstack/react-query';
import { CurrentGoldPrice } from '../CurrentGoldPrice';
import { useGetCurrentGoldPrice } from '../../hooks/useGetCurrentGoldPrice';
import { GoldPriceModel } from '../../models/GoldPriceModel';

vi.mock('../../hooks/useGetCurrentGoldPrice');

describe('CurrentGoldPrice', () => {
  const queryClient = new QueryClient();

  const renderWithProviders = (component: React.ReactNode) => {
    render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>,
    );
  };

  const getHookResult = (
    value: Partial<UseQueryResult<GoldPriceModel, Error>>,
  ) => value as unknown as UseQueryResult<GoldPriceModel, Error>;

  it('should display loading state', async () => {
    const mockResult = getHookResult({
      data: undefined,
      isFetching: true,
      isError: false,
      refetch: vi.fn(),
    });

    vi.mocked(useGetCurrentGoldPrice).mockReturnValue(mockResult);

    renderWithProviders(<CurrentGoldPrice />);

    const loadingIndicator = page.getByRole('progressbar');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('should display error state', async () => {
    const mockResult = getHookResult({
      data: undefined,
      isFetching: false,
      isError: true,
      refetch: vi.fn(),
    });

    vi.mocked(useGetCurrentGoldPrice).mockReturnValue(mockResult);

    renderWithProviders(<CurrentGoldPrice />);

    const errorMessage = page.getByText('Not found');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display data when available', async () => {
    const mockResult = getHookResult({
      data: { date: new Date('2025-01-01'), price: 325.45 },
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    vi.mocked(useGetCurrentGoldPrice).mockReturnValue(mockResult);

    renderWithProviders(<CurrentGoldPrice />);

    const date = page.getByText(new Date('2025-01-01').toString());
    const price = page.getByText('325.45');

    expect(date).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});

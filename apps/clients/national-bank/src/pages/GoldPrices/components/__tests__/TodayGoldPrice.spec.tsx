import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from '@vitest/browser/context';
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from '@tanstack/react-query';
import { TodayGoldPrice } from '../TodayGoldPrice';
import { useGetTodayGoldPrice } from '../../hooks/useGetTodayGoldPrice';
import { GoldPriceModel } from '../../models/GoldPriceModel';

vi.mock('../../hooks/useGetTodayGoldPrice');

describe('TodayGoldPrice', () => {
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
    vi.mocked(useGetTodayGoldPrice).mockReturnValue(
      getHookResult({
        data: undefined,
        isFetching: true,
        isError: false,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<TodayGoldPrice />);

    const loadingIndicator = page.getByRole('progressbar');
    await expect(loadingIndicator).toBeInTheDocument();
  });

  it('should display error state', async () => {
    vi.mocked(useGetTodayGoldPrice).mockReturnValue(
      getHookResult({
        data: undefined,
        isFetching: false,
        isError: true,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<TodayGoldPrice />);

    const errorMessage = page.getByText('Not found');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display data when available', async () => {
    const mockDate = new Date('2025-01-01');
    vi.mocked(useGetTodayGoldPrice).mockReturnValue(
      getHookResult({
        data: { date: mockDate, price: 325.45 },
        isFetching: false,
        isError: false,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<TodayGoldPrice />);

    const date = page.getByText(mockDate.toString());
    const price = page.getByText('325.45');

    expect(date).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it('should call refetch when the reload button is clicked', async () => {
    const refetchMock = vi.fn();
    vi.mocked(useGetTodayGoldPrice).mockReturnValue(
      getHookResult({
        data: { date: new Date('2025-01-01'), price: 325.45 },
        isFetching: false,
        isError: false,
        refetch: refetchMock,
      }),
    );

    renderWithProviders(<TodayGoldPrice />);

    const reloadButton = page.getByRole('button', { name: 'Reload' });
    await reloadButton.click();

    expect(refetchMock).toHaveBeenCalled();
  });
});

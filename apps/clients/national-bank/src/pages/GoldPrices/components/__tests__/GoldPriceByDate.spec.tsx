import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from '@vitest/browser/context';
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from '@tanstack/react-query';
import { GoldPriceByDate } from '../GoldPriceByDate';
import { useGetGoldPriceByDate } from '../../hooks/useGetGoldPriceByDate';
import { GoldPriceModel } from '../../models/GoldPriceModel';

vi.mock('../../hooks/useGetGoldPriceByDate');

describe('GoldPriceByDate', () => {
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
    vi.mocked(useGetGoldPriceByDate).mockReturnValue(
      getHookResult({
        data: undefined,
        isFetching: true,
        isError: false,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<GoldPriceByDate />);

    const loadingIndicator = page.getByRole('progressbar');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('should display error state', async () => {
    vi.mocked(useGetGoldPriceByDate).mockReturnValue(
      getHookResult({
        data: undefined,
        isFetching: false,
        isError: true,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<GoldPriceByDate />);

    const errorMessage = page.getByText('Not found');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display data when available', async () => {
    const mockDate = new Date('2025-01-01');
    vi.mocked(useGetGoldPriceByDate).mockReturnValue(
      getHookResult({
        data: { date: mockDate, price: 325.45 },
        isFetching: false,
        isError: false,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<GoldPriceByDate />);

    const date = page.getByText(mockDate.toString());
    const price = page.getByText('325.45');

    expect(date).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it('should call refetch when the reload button is clicked', async () => {
    const refetchMock = vi.fn();
    vi.mocked(useGetGoldPriceByDate).mockReturnValue(
      getHookResult({
        data: { date: new Date('2025-01-01'), price: 325.45 },
        isFetching: false,
        isError: false,
        refetch: refetchMock,
      }),
    );

    renderWithProviders(<GoldPriceByDate />);

    const reloadButton = page.getByRole('button', { name: 'Reload' });
    await reloadButton.click();

    expect(refetchMock).toHaveBeenCalled();
  });

  it('should update the date when the date input is changed', async () => {
    vi.mocked(useGetGoldPriceByDate).mockReturnValue(
      getHookResult({
        data: undefined,
        isFetching: false,
        isError: false,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<GoldPriceByDate />);

    const dateInput = page.getByLabelText('Date').element() as HTMLInputElement;

    // Update the value first
    dateInput.value = '2025-01-02';

    // Dispatch the input event after updating the value
    dateInput.dispatchEvent(new Event('input', { bubbles: true }));

    // Assert the updated value
    expect(dateInput.value).toBe('2025-01-02');
  });
});

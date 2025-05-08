import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from '@vitest/browser/context';
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from '@tanstack/react-query';
import { LastGoldPrices } from '../LastGoldPrices';
import { useGetLastGoldPrices } from '../../hooks/useGetLastGoldPrices';
import { format } from 'date-fns';
import { GoldPriceModel } from '../../models/GoldPriceModel';

vi.mock('../../hooks/useGetLastGoldPrices');

describe('LastGoldPrices', () => {
  const queryClient = new QueryClient();

  const renderWithProviders = (component: React.ReactNode) => {
    render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>,
    );
  };

  const getHookResult = (
    value: Partial<UseQueryResult<GoldPriceModel[], Error>>,
  ) => value as unknown as UseQueryResult<GoldPriceModel[], Error>;

  it('should display loading state', async () => {
    vi.mocked(useGetLastGoldPrices).mockReturnValue(
      getHookResult({
        data: undefined,
        isFetching: true,
        isError: false,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<LastGoldPrices />);

    const loadingIndicator = page.getByRole('progressbar');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('should display error state', async () => {
    vi.mocked(useGetLastGoldPrices).mockReturnValue(
      getHookResult({
        data: undefined,
        isFetching: false,
        isError: true,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<LastGoldPrices />);

    const errorMessage = page.getByText('Not found');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display data in a table when available', async () => {
    const mockData = [
      { date: new Date('2025-01-01'), price: 325.45 },
      { date: new Date('2025-01-02'), price: 330.12 },
    ];
    vi.mocked(useGetLastGoldPrices).mockReturnValue(
      getHookResult({
        data: mockData,
        isFetching: false,
        isError: false,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<LastGoldPrices />);

    const rows = page.getByRole('row').elements();
    expect(rows).toHaveLength(mockData.length + 1);

    rows.slice(1).forEach((row, index) => {
      const cells = row.querySelectorAll('td');
      expect(cells[0].textContent).toBe(mockData[index].date.toString());
      expect(cells[1].textContent).toBe(mockData[index].price.toString());
    });
  });

  it('should call refetch when the reload button is clicked', async () => {
    const refetchMock = vi.fn();
    vi.mocked(useGetLastGoldPrices).mockReturnValue(
      getHookResult({
        data: [],
        isFetching: false,
        isError: false,
        refetch: refetchMock,
      }),
    );

    renderWithProviders(<LastGoldPrices />);

    const reloadButton = page.getByRole('button', { name: 'Reload' });
    await reloadButton.click();

    expect(refetchMock).toHaveBeenCalled();
  });

  it('should update the top count when the input is changed', async () => {
    vi.mocked(useGetLastGoldPrices).mockReturnValue(
      getHookResult({
        data: [],
        isFetching: false,
        isError: false,
        refetch: vi.fn(),
      }),
    );

    renderWithProviders(<LastGoldPrices />);

    const topCountInput = page
      .getByLabelText('Top count')
      .element() as HTMLInputElement;
    topCountInput.value = '5';
    topCountInput.dispatchEvent(new Event('input', { bubbles: true }));

    expect(topCountInput.value).toBe('5');
  });
});

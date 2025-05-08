import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { AppHeader } from '../AppHeader';

describe('AppHeader', () => {
  it('should render without crashing', async () => {
    render(<AppHeader />);

    await expect.element(page.getByTestId('app-header')).toBeInTheDocument();
  });

  it('should display the correct title', async () => {
    render(<AppHeader />);

    await expect
      .element(page.getByText('Open Data National Bank'))
      .toBeInTheDocument();
  });
});

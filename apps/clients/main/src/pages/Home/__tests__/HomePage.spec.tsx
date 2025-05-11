import { page } from '@vitest/browser/context';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { HomePage } from '../HomePage';

describe('HomePage', () => {
  it('should render the heading', async () => {
    render(<HomePage />);
    const heading = page.getByRole('heading', { name: 'Home' });
    await expect(heading).toBeInTheDocument();
  });

  it('should render the description paragraph', async () => {
    render(<HomePage />);
    const paragraph = page.getByText(
      'This is the home page of the Open Data Main client application.',
    );
    await expect(paragraph).toBeInTheDocument();
  });
});

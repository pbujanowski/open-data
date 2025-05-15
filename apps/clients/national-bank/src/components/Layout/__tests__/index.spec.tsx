import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from '../index';

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <MemoryRouter initialEntries={['/national-bank']}>
        <Layout>
          <div>Test Child</div>
        </Layout>
      </MemoryRouter>,
    );
    expect(document.body.textContent).toContain('Test Child');
  });

  it('renders all tabs', () => {
    render(
      <MemoryRouter initialEntries={['/national-bank']}>
        <Layout>
          <div />
        </Layout>
      </MemoryRouter>,
    );
    expect(document.body.textContent).toContain('Home');
    expect(document.body.textContent).toContain('Gold Prices');
  });

  it('activates the correct tab for /national-bank', () => {
    render(
      <MemoryRouter initialEntries={['/national-bank']}>
        <Layout>
          <div />
        </Layout>
      </MemoryRouter>,
    );
    const selectedTab = document.querySelector('[aria-selected="true"]');
    expect(selectedTab?.textContent).toBe('Home');
  });

  it('activates the correct tab for /national-bank/gold-prices', () => {
    render(
      <MemoryRouter initialEntries={['/national-bank/gold-prices']}>
        <Layout>
          <div />
        </Layout>
      </MemoryRouter>,
    );
    const selectedTab = document.querySelector('[aria-selected="true"]');
    expect(selectedTab?.textContent).toBe('Gold Prices');
  });

  it('defaults to first tab if route does not match', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Layout>
          <div />
        </Layout>
      </MemoryRouter>,
    );
    const selectedTab = document.querySelector('[aria-selected="true"]');
    expect(selectedTab?.textContent).toBe('Home');
  });

  it('responds to themeChanged event', () => {
    localStorage.setItem('theme-mode', 'dark');
    render(
      <MemoryRouter initialEntries={['/national-bank']}>
        <Layout>
          <div />
        </Layout>
      </MemoryRouter>,
    );
    window.dispatchEvent(new Event('themeChanged'));
  });
});

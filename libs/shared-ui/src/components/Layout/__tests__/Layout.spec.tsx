import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from '../Layout';

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Layout tabItems={[{ label: 'Home', to: '/home' }]}>
          <div>Test Child</div>
        </Layout>
      </MemoryRouter>,
    );
    expect(document.body.textContent).toContain('Test Child');
  });

  it('renders all tabs', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Layout tabItems={[{ label: 'Home', to: '/home' }]}>
          <div />
        </Layout>
      </MemoryRouter>,
    );
    expect(document.body.textContent).toContain('Home');
  });

  it('activates the correct tab for /home', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Layout tabItems={[{ label: 'Home', to: '/home' }]}>
          <div />
        </Layout>
      </MemoryRouter>,
    );
    const selectedTab = document.querySelector('[aria-selected="true"]');
    expect(selectedTab?.textContent).toBe('Home');
  });

  it('defaults to first tab if route does not match', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Layout tabItems={[{ label: 'Home', to: '/home' }]}>
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
      <MemoryRouter initialEntries={['/home']}>
        <Layout tabItems={[{ label: 'Home', to: '/home' }]}>
          <div />
        </Layout>
      </MemoryRouter>,
    );
    window.dispatchEvent(new Event('themeChanged'));
  });
});

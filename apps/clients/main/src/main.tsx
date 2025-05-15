import ReactDOM from 'react-dom/client';
import { App } from './App';
import { registerApplication, start } from 'single-spa';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const rootDiv = document.getElementById('root');
if (rootDiv) {
  ReactDOM.createRoot(rootDiv).render(<App />);
}

registerApplication({
  name: '@open-data/dashboard-client',
  app: () => import('../../dashboard/src/main'),
  activeWhen: ['/dashboard'],
  customProps: {
    domElementGetter: () => document.getElementById('microfrontend-root'),
  },
});

registerApplication({
  name: '@open-data/national-bank-client',
  app: () => import('../../national-bank/src/main'),
  activeWhen: ['/national-bank'],
  customProps: {
    domElementGetter: () => document.getElementById('microfrontend-root'),
  },
});

start();

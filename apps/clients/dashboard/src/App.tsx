import { Layout, TabItemModel } from '@open-data/shared-ui-lib';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const App = () => {
  const queryClient = new QueryClient();

  const tabItems: TabItemModel[] = [{ label: 'Home', to: '/dashboard' }];

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout tabItems={tabItems}>
          <Routes>
            <Route path="/dashboard" element={<HomePage />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

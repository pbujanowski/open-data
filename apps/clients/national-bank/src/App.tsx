import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { GoldPricesPage } from './pages/GoldPrices/GoldPricesPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/national-bank" element={<HomePage />} />
            <Route
              path="/national-bank/gold-prices"
              element={<GoldPricesPage />}
            />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

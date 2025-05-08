import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home/HomePage';
import { GoldPricesPage } from './pages/GoldPrices/GoldPricesPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gold-prices" element={<GoldPricesPage />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

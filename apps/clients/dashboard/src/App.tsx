import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<HomePage />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

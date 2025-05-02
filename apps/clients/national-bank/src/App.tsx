import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { GoldPrices } from './pages/GoldPrices';

export const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gold-prices" element={<GoldPrices />} />
        </Routes>
      </Layout>
    </Router>
  );
};

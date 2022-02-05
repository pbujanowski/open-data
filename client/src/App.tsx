import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppTheme } from "./theme";
import { AppLayout } from "./layout";
import { PageContainer } from "./components";
import { routes } from "./routes";

const App: React.FC = () => {
  return (
    <AppTheme>
      <Router>
        <AppLayout>
          <Routes>
            {routes.map((route) => (
              <Route key={route.key} path={route.path} element={<PageContainer page={route.component} />} />
            ))}
          </Routes>
        </AppLayout>
      </Router>
    </AppTheme>
  );
};

export default App;

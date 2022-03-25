import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppTheme } from "./theme";
import { AppLayout } from "./layout";
import { AuthorizeRoute, PageContainer } from "./components";
import { routes } from "./routes";

const App: React.FC = () => {
  return (
    <AppTheme>
      <Router>
        <AppLayout>
          <Routes>
            {routes.map((route) => {
              const page = <PageContainer page={route.component} />;
              return (
                <Route
                  key={route.key}
                  path={route.path}
                  element={route.authorize ? <AuthorizeRoute>{page}</AuthorizeRoute> : <>{page}</>}
                />
              );
            })}
          </Routes>
        </AppLayout>
      </Router>
    </AppTheme>
  );
};

export default App;

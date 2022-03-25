import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider, AuthService } from "react-oauth2-pkce";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./i18n";

import App from "./App";
import { LoadingIndicator } from "components";
import { store } from "store";

const authService = new AuthService({
  clientId: "open-data-client",
  location: window.location,
  provider: "https://localhost:5001/connect",
  redirectUri: "http://localhost:3000",
  scopes: ["openid", "profile", "email", "open-data-api"],
});

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingIndicator />}>
      <AuthProvider authService={authService}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </AuthProvider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root"),
);

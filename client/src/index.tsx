import React from "react";
import ReactDOM from "react-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./i18n";

import App from "./App";
import { LoadingIndicator } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingIndicator />}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root"),
);

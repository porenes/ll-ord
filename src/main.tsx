import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Setup } from "./Setup.tsx";

import './i18n.ts';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Setup>
      <App />
    </Setup>
  </React.StrictMode>
);

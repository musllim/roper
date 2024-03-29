import React from "react";
import ReactDOM from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Theme } from "@radix-ui/themes";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";

import "@radix-ui/themes/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <ThirdwebProvider
        activeChain={import.meta.env.VITE_ACTIVECHAIN}
        clientId={import.meta.env.VITE_CLIENTID}
      >
        <Theme
          accentColor="crimson"
          grayColor="sand"
          radius="large"
          scaling="95%"
        >
          <App />
        </Theme>
      </ThirdwebProvider>
    </ErrorBoundary>
  </React.StrictMode>
);


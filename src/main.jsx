import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "../src/assets/css/Style.css";
import "../src/assets/css/Responsive.css";
import store from "./app/store.js";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import { ThirdwebProvider } from "thirdweb/react";
// import { ThirdwebProvider } from "@thirdweb-dev/react"; // Correct Import
// 259b318c917dc7ee7d3b94ddb20f557f clint 
// hJu3cz3XP8kHaPYKlT_mEKdhGJXDAkVfqXyhx2Gsf_onYBi95uyELF_X76i6gCGAE6gGfshWVql4yb4K7WWH6A
// Set up your Thirdweb configuration
const activeChain = "ethereum"; // Change to your blockchain (e.g., polygon, bsc, etc.)
const clientId = "259b318c917dc7ee7d3b94ddb20f557f"; // Replace with your Thirdweb client ID
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <ThirdwebProvider activeChain={activeChain} clientId={clientId}>
  <ThirdwebProvider>
  {/* // <QueryClientProvider client={queryClient}> */}
    <Provider store={store}>
      <ThemeProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </Provider>
   {/* </QueryClientProvider> */}
</ThirdwebProvider>

);

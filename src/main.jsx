import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./Routes/Route.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import PrintProvider from "./pages/context/PrintProvider.jsx";
import Providers from "./lib/Providers/Providers.jsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Providers>
          <PrintProvider>
            <ToastContainer />
            <RouterProvider router={router} />
           
          </PrintProvider>
        </Providers>
        
      </ThemeProvider>
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

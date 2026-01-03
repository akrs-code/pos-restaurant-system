import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./redux/store.js"
import { Provider } from "react-redux"
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    }
  } //setting up the react query and notistack 
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={3000}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SnackbarProvider>
    </Provider>
  </StrictMode>,
)

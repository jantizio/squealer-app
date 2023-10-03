import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/components/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import App from './App.tsx';
import './index.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthSetter from '@/components/AuthSetter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AuthSetter>
              <App />
            </AuthSetter>
          </ThemeProvider>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster, toast } from 'sonner';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AxiosError } from 'axios';
import { isErrorMessages } from './lib/utils.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 1000, // 20 seconds
    },
  },
  queryCache: new QueryCache({
    onError(_error, _query) {
      toast.error('TODO errore');
    },
  }),
  mutationCache: new MutationCache({
    onError(error, _variables, _context, mutation) {
      const errorMessages = mutation.meta?.errorMessages;

      if (
        isErrorMessages(errorMessages) &&
        error instanceof AxiosError &&
        error.response?.status
      ) {
        const statusCode = error.response.status;
        const errorMessage = errorMessages[statusCode] ?? errorMessages.generic;
        toast.error(errorMessage);
      }

      console.log('not axios error');
      toast.error('Qualcosa è andato storto, riprova più tardi');
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
          <Toaster />
          <SonnerToaster richColors />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

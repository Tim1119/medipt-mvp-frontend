import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

import App from './App.tsx';
import { store, persistor } from './app/store';
import PageLoader from '@/components/loading/PageLoader';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* PersistGate delays rendering until persisted state is retrieved */}
        <PersistGate loading={<PageLoader />} persistor={persistor}>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#363636',
                fontFamily: 'Inter, sans-serif',
              },
              success: {
                iconTheme: {
                  primary: '#009899',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//API
import { QueryClient, QueryClientProvider } from 'react-query';

import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          staleTime: 5_000,
          refetchOnWindowFocus: false,
          refetchOnMount: 'always',
      },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

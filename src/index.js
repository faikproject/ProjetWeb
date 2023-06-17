import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//API
import { QueryClient, QueryClientProvider } from 'react-query';

import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Homepage from './pages/Homepage';
import Signup from './components/common/Signup';
import Login from './components/common/Login';
import Profile from './pages/layouts/Profile';
import Articles from './pages/layouts/Articles';

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
                <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/news" element={<Articles />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

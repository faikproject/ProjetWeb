import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//API
import { QueryClient, QueryClientProvider } from 'react-query';

import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

//PAGES
import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardArticles from './pages/dashboard/Articles';
import DashboardGallery from './pages/dashboard/Gallery';
import DashboardParamsAccount from './pages/dashboard/DashboardParamsAccount';
import Articles from './pages/Articles';
import GalleryPage from './pages/GalleryPage';
import Profile from './pages/Profile';
//COMPONENTS
import Signup from './components/forms/Signup';
import Login from './components/forms/Login';
import ProtectedRoute from './components/common/ProtectedRoute';
//CONTEXT
import { SocketProvider } from './context/socketContext';
import { AuthProvider } from './context/authContext';
import { FormProvider } from './context/formContext';

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
        <SocketProvider>
            <AuthProvider>
                <FormProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="dashboard">
                            <Route
                                path="profil"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            ></Route>
                            <Route
                                path="news"
                                element={
                                <ProtectedRoute>
                                    <DashboardArticles />
                                </ProtectedRoute>
                                }
                            ></Route>
                            <Route
                                path="gallery"
                                element={
                                <ProtectedRoute>
                                    <DashboardGallery />
                                </ProtectedRoute>
                                }
                            ></Route>
                             <Route
                                path="account"
                                element={
                                    <ProtectedRoute>
                                        <DashboardParamsAccount />
                                    </ProtectedRoute>
                                }
                            ></Route>
                            </Route>
                            <Route path="/" element={<Home />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/news" element={<Articles />} />
                            <Route path="/gallery" element={<GalleryPage />} />
                        </Routes>
                    </BrowserRouter>
                </FormProvider>
            </AuthProvider>
        </SocketProvider>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

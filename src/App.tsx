import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { CreateBusiness } from './components/CreateBusiness';
import { StoreLayout } from './components/store/StoreLayout';
import { MyStores } from './pages/MyStores';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/minhas-lojas" element={<MyStores />} />
        <Route path="/criar-negocio" element={<CreateBusiness />} />
        <Route path="/loja/:businessId" element={<StoreLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
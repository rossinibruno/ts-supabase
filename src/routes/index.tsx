import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './RequireAuth';

import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Dashboard from '../components/Dashboard';

import NotFound from '../components/NotFound';

export default function Router() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen/HomeScreen';
import ResetPassword from './components/Reset Password/ResetPassword';
import AuthLayout from './components/AuthLayout/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              <HomeScreen />
            </AuthLayout>
          }
        />
        <Route
          path="/reset"
          element={
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

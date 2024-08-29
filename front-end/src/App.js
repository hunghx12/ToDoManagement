import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer
        autoClose={1000}
        preventDuplicates={true}
      />
    </Router>
  );
}

export default App;

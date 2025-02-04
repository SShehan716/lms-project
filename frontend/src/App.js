import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import Dashboard from './pages/DashboardPage';
import Header from './components/common/AppHeader';
import Footer from './components/common/Footer';

const App = () => {
    return (
        <Router>
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </Router>
    );
};

export default App;

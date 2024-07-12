import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const App = () => {
    return (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </Router>
    );
};

export default App;

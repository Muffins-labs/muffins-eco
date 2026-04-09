import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import CreateCampaignForm from './components/CreateCampaignForm'; // ← Добавим компонент

function App() {
    return (
        <Router>
            <CssBaseline />
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-campaign" element={<CreateCampaignForm />} /> {/* ← Добавим маршрут */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
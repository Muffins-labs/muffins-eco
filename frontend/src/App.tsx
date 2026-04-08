import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import CreateCampaignForm from './components/CreateCampaignForm';
import HomePage from './pages/HomePage'; // Импортируем новую главную страницу

function App() {
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        window.location.href = '/'; // Перенаправляем на главную
    };

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Muffins Platform
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<HomePage />} /> {/* ← Главная страница */}
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-campaign" element={<CreateCampaignForm />} />
            </Routes>
        </Router>
    );
}

export default App;
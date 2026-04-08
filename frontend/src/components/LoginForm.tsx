import React, { useState } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
} from '@mui/material';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // ВРЕМЕННАЯ ЗАГЛУШКА: сохраняем email в localStorage и перенаправляем
        localStorage.setItem('current_user_email', email);
        localStorage.setItem('access_token', 'fake-token-for-now'); // Заглушка
        alert('Login successful (stub)! Redirecting...');
        window.location.href = '/dashboard';
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                <Typography component="h1" variant="h5">
                    Sign In (Stub)
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default LoginForm;
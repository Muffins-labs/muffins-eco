import React from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', // ← Градиент как у хедера
                color: 'white',
                py: 2, // ← Уменьшили высоту (было py: 6)
                mt: 4,
            }}
        >
            <Container maxWidth="md"> {/* ← Уже более узкий */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Логотип */}
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{
                            color: 'inherit',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                        }}
                    >
                        MUFFINS
                    </Typography>

                    {/* Ссылки */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Link
                            component={RouterLink}
                            to="/"
                            color="inherit"
                            underline="hover"
                            sx={{ fontFamily: 'Roboto, sans-serif' }} // ← Шрифт как у хедера
                        >
                            Home
                        </Link>
                        <Link
                            component={RouterLink}
                            to="/register"
                            color="inherit"
                            underline="hover"
                            sx={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                            Register
                        </Link>
                        <Link
                            component={RouterLink}
                            to="/login"
                            color="inherit"
                            underline="hover"
                            sx={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                            Log In
                        </Link>
                    </Box>
                </Box>

                {/* Копирайт */}
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Typography variant="body2" color="inherit" sx={{ fontFamily: 'Roboto, sans-serif' }}>
                        © {new Date().getFullYear()} Muffins. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
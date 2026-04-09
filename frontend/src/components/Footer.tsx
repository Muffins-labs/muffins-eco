import React from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
    IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';    // Discord
import PublicIcon from '@mui/icons-material/Public'; // VK
import SendIcon from '@mui/icons-material/Send';     // Telegram

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', // ← Тот же градиент
                color: 'white',
                py: 3, // ← Тот же размер (был py: 2)
                mt: 4,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
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
                            sx={{ fontFamily: 'Roboto, sans-serif' }}
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
                    </Box>

                    {/* Соцсети */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton color="inherit" href="#" target="_blank">
                            <ChatIcon /> {/* Discord */}
                        </IconButton>
                        <IconButton color="inherit" href="#" target="_blank">
                            <PublicIcon /> {/* VK */}
                        </IconButton>
                        <IconButton color="inherit" href="#" target="_blank">
                            <SendIcon /> {/* Telegram */}
                        </IconButton>
                    </Box>
                </Box>

                {/* Контакты и копирайт */}
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" color="inherit" sx={{ fontFamily: 'Roboto, sans-serif' }}>
                        Email: hello@muffins.dev
                    </Typography>
                    <Typography variant="body2" color="inherit" sx={{ fontFamily: 'Roboto, sans-serif', mt: 1 }}>
                        © {new Date().getFullYear()} Muffins. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
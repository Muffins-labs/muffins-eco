import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Link as MuiLink,
    IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DiscordIcon from '@mui/icons-material/Chat'; // Заменяем Facebook на Discord
import VkIcon from '@mui/icons-material/Public'; // Заменяем Twitter на VK
import TelegramIcon from '@mui/icons-material/Send'; // Новая иконка Telegram
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(90deg, #2c3e50 0%, #1a2a3a 100%)',
                color: 'white',
                py: 3, // Уменьшили отступы (было py: 6)
                mt: 6,
            }}
        >
            <Container maxWidth="lg">
                {/* Верхняя часть футера */}
                <Grid container spacing={4} sx={{ pb: 2, borderBottom: '1px solid #444' }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Muffins
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Full-service promotion for streamers & YouTubers.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Quick Links
                        </Typography>
                        <MuiLink component={Link} to="/" color="inherit" display="block" sx={{ mb: 0.5 }}>
                            Home
                        </MuiLink>
                        <MuiLink component={Link} to="/register" color="inherit" display="block" sx={{ mb: 0.5 }}>
                            Register
                        </MuiLink>
                        <MuiLink component={Link} to="/login" color="inherit" display="block" sx={{ mb: 0.5 }}>
                            Log In
                        </MuiLink>
                        <MuiLink component={Link} to="/dashboard" color="inherit" display="block" sx={{ mb: 0.5 }}>
                            Dashboard
                        </MuiLink>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Email: hello@muffins.dev
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Support: support@muffins.dev
                        </Typography>
                    </Grid>
                </Grid>

                {/* Нижняя часть футера (соцсети и копирайт) */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton color="inherit" href="#" target="_blank">
                                <DiscordIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" target="_blank">
                                <VkIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" target="_blank">
                                <TelegramIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" target="_blank">
                                <YouTubeIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body2" color="textSecondary" align="right">
                            © {new Date().getFullYear()} Muffins. All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
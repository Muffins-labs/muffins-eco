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
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer: React.FC = () => {
    return (
        <Box sx={{ background: 'linear-gradient(90deg, #2c3e50 0%, #1a2a3a 100%)', color: 'white', py: 6, mt: 8 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Muffins
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Full-service promotion for streamers & YouTubers.
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <IconButton color="inherit" href="#" target="_blank">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" target="_blank">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" target="_blank">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" target="_blank">
                                <YouTubeIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <MuiLink component={Link} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
                            Home
                        </MuiLink>
                        <MuiLink component={Link} to="/register" color="inherit" display="block" sx={{ mb: 1 }}>
                            Register
                        </MuiLink>
                        <MuiLink component={Link} to="/login" color="inherit" display="block" sx={{ mb: 1 }}>
                            Log In
                        </MuiLink>
                        <MuiLink component={Link} to="/dashboard" color="inherit" display="block" sx={{ mb: 1 }}>
                            Dashboard
                        </MuiLink>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom>
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
                <Box sx={{ pt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} Muffins. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
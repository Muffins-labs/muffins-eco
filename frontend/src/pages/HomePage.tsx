import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Paper,
    useScrollTrigger,
    Slide,
    Fade,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Компонент для анимации при скролле
function ScrollHandler(props: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({ threshold: 10 });

    return (
        <Slide appear={false} direction="up" in={trigger}>
            {props.children}
        </Slide>
    );
}

const HomePage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', overflowX: 'hidden' }}>
            {/* Параллакс-баннер */}
            <Box
                sx={{
                    height: '100vh',
                    backgroundImage: 'url(https://source.unsplash.com/1600x900/?gaming,livestream)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', // затемнение
                    },
                }}
            >
                <Fade in timeout={1500}>
                    <Box sx={{ zIndex: 1, textAlign: 'center', color: 'white' }}>
                        <Typography variant="h2" component="h1" gutterBottom>
                            Grow Your Stream
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Full-service promotion for streamers & YouTubers
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            component={Link} to="/register"
                            sx={{ mt: 2, mr: 2 }}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            color="inherit"
                            component={Link} to="/login"
                            sx={{ mt: 2 }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Fade>
            </Box>

            {/* Блок с услугами */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Our Services
                </Typography>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    {[
                        { title: 'Design Start', desc: 'Cover, icons, banner' },
                        { title: 'OBS Setup', desc: 'Templates, settings, tools' },
                        { title: 'Discord Server', desc: 'Setup & moderation' },
                        { title: 'Full Service', desc: 'Complete promotion' },
                    ].map((service, idx) => (
                        <Grid size={{ xs: 12, md: 3 }} key={idx}>
                            <ScrollHandler>
                                <Paper
                                    elevation={8}
                                    sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        height: '100%',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                        },
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        {service.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {service.desc}
                                    </Typography>
                                </Paper>
                            </ScrollHandler>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Блок с преимуществами */}
            <Box
                sx={{
                    py: 8,
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="h4" gutterBottom>
                                Why Choose Us?
                            </Typography>
                            <Typography paragraph>
                                We offer full-service promotion tailored to your needs. From design to tech setup, we handle everything.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link} to="/register"
                            >
                                Join Now
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <img
                                src="https://source.unsplash.com/800x600/?streaming,setups"
                                alt="Streaming setup"
                                style={{ width: '100%', borderRadius: 8 }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
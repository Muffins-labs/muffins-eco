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
    Card,
    CardContent,
    CardMedia,
    Rating,
    Fab,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Примеры тарифов
    const tariffs = [
        {
            name: 'Silver Package',
            price: '3 990 ₽',
            services: ['Обложки', 'Иконки', 'Шапка'],
            popular: false,
        },
        {
            name: 'Gold Package',
            price: '7 490 ₽',
            services: ['OBS-шаблоны', 'Discord-сервер', 'Контент-план'],
            popular: true,
        },
        {
            name: 'Platinum Package',
            price: '15 890 ₽',
            services: ['Всё включено', 'Поддержка 1 месяц', 'Стратегия'],
            popular: false,
        },
    ];

    // Примеры работ
    const examples = [
        { title: 'Twitch Cover', image: 'https://source.unsplash.com/400x200/?twitch,cover' },
        { title: 'Discord Server', image: 'https://source.unsplash.com/400x200/?discord,setup' },
        { title: 'OBS Layout', image: 'https://source.unsplash.com/400x200/?obs,layout' },
    ];

    // Отзывы
    const reviews = [
        { name: 'Arffei', rating: 5, text: 'Прокачали мой канал с 0 до 1000 зрителей!' },
        { name: 'StreamMaster', rating: 5, text: 'Очень довольна дизайном и настройкой.' },
        { name: 'GamerGirl', rating: 4, text: 'Быстро, качественно, рекомендую!' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', overflowX: 'hidden', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                <Fade in timeout={1500}>
                    <Box sx={{ zIndex: 1, textAlign: 'center', color: 'white' }}>
                        <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                            Muffins
                        </Typography>
                        <Typography variant="h4" gutterBottom sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            Grow Your Stream
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            Full-service promotion for streamers & YouTubers
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            component={Link} to="/register"
                            sx={{ mt: 2, mr: 2, px: 4, py: 1.5, fontSize: '1.2rem' }}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            color="inherit"
                            component={Link} to="/login"
                            sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1.2rem' }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Fade>
            </Box>

            {/* Блок с тарифами */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom color="primary" sx={{ fontWeight: 'bold', mb: 6 }}>
                    Our Packages
                </Typography>
                <Grid container spacing={isMobile ? 2 : 4}>
                    {tariffs.map((tariff, idx) => (
                        <Grid size={{ xs: 12, md: 4 }} key={idx}>
                            <ScrollHandler>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        background: 'white',
                                        borderRadius: 4,
                                        boxShadow: 6,
                                        ...(tariff.popular && {
                                            border: '3px solid #ff6b6b',
                                            transform: 'scale(1.05)',
                                            zIndex: 1,
                                        }),
                                    }}
                                >
                                    {tariff.popular && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -10,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                background: '#ff6b6b',
                                                color: 'white',
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            POPULAR
                                        </Box>
                                    )}
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Typography variant="h5" component="h3" gutterBottom align="center">
                                            {tariff.name}
                                        </Typography>
                                        <Typography variant="h4" color="primary" align="center" gutterBottom>
                                            {tariff.price}
                                        </Typography>
                                        <ul>
                                            {tariff.services.map((service, i) => (
                                                <li key={i}>{service}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <Box sx={{ p: 2 }}>
                                        <Button
                                            variant={tariff.popular ? 'contained' : 'outlined'}
                                            color="primary"
                                            fullWidth
                                            component={Link} to="/register"
                                        >
                                            Choose Plan
                                        </Button>
                                    </Box>
                                </Card>
                            </ScrollHandler>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Примеры работ */}
            <Container maxWidth="lg" sx={{ py: 8, background: 'linear-gradient(to bottom, #ffffff, #f0f4f8)' }}>
                <Typography variant="h3" align="center" gutterBottom color="secondary" sx={{ fontWeight: 'bold', mb: 6 }}>
                    Examples
                </Typography>
                <Grid container spacing={isMobile ? 2 : 4}>
                    {examples.map((example, idx) => (
                        <Grid size={{ xs: 12, md: 4 }} key={idx}>
                            <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={example.image}
                                    alt={example.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h4">
                                        {example.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Отзывы */}
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom color="primary" sx={{ fontWeight: 'bold', mb: 6 }}>
                    What Our Clients Say
                </Typography>
                <Grid container spacing={isMobile ? 2 : 4}>
                    {reviews.map((review, idx) => (
                        <Grid size={{ xs: 12, md: 4 }} key={idx}>
                            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 4, background: 'white' }}>
                                <Rating value={review.rating} readOnly />
                                <Typography variant="h6">{review.name}</Typography>
                                <Typography color="textSecondary">{review.text}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Кнопка "наверх" */}
            <Fab
                color="primary"
                size="small"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    boxShadow: 4,
                }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Box>
    );
};

export default HomePage;
import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Paper,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Тарифы
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
: false,
        },
    ];

    // Что мы делаем
    const services = [
        {
            title: 'Дизайн',
            description: 'Обложки, иконки, шапки, баннеры',
        },
        {
            title: 'OBS Setup',
            description: 'Шаблоны, настройка, плагины',
        },
        {
            title: 'Discord',
            description: 'Создание, настройка, модерация',
        },
    ];

    return (
        <Box sx={{ minHeight: '100vh', overflowX: 'hidden', background: 'linear-gradient(135deg, #f0f2f5 0%, #e6e9ef 100%)' }}>
            {/* 1. О компании Muffins */}
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
                </Box>
            </Box>

            {/* 2. Что мы делаем */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
                    What We Do
                </Typography>
                <Grid container spacing={isMobile ? 2 : 4} sx={{ mt: 2 }}>
                    {services.map((service, idx) => (
                        <Grid size={{ xs: 12, md: 4 }} key={idx}>
                            <Card sx={{ height: '100%', boxShadow: 4 }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        {service.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* 3. Наши тарифы */}
            <Container maxWidth="lg" sx={{ py: 8, background: 'linear-gradient(to bottom, #ffffff, #f0f4f8)' }}>
                <Typography variant="h3" align="center" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
                    Our Packages
                </Typography>
                <Grid container spacing={isMobile ? 2 : 4} sx={{ mt: 2 }}>
                    {tariffs.map((tariff, idx) => (
                        <Grid size={{ xs: 12, md: 4 }} key={idx}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
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
                                <CardContent sx={{ flexGrow: 1 }}>
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
                                <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                                    <Button variant={tariff.popular ? 'contained' : 'outlined'} color="primary">
                                        Choose Plan
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* 4. Кнопка "Запустить компанию" */}
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    component={Link} to="/create-campaign" // ← Переход на Stepper
                    sx={{ px: 4, py: 1.5, fontSize: '1.2rem' }}
                >
                    Запустить компанию
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;
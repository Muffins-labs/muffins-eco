import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    CircularProgress,
    Step,
    StepLabel,
    Stepper,
    Tooltip,
    IconButton,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    Card,
    CardContent,
} from '@mui/material';
import { Info, ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Tariff {
    id: number;
    name: string;
    price: number;
    services: string[];
}

interface FormData {
    goal: string;
    content_type: 'stream' | 'video' | '';
    channel_url: string;
    channel_nickname: string;
    game_genre: string;
    audience_age: string;
    audience_region: string;
    audience_auto: boolean;
    tariff_id: number;
    budget: number;
    duration: number;
    user_id: number;
}

const steps = [
    'Цель кампании',
    'Информация о канале',
    'Целевая аудитория',
    'Тариф и опции',
    'Подтверждение',
];

const CreateCampaignForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        goal: '',
        content_type: '',
        channel_url: '',
        channel_nickname: '',
        game_genre: '',
        audience_age: '18-25',
        audience_region: 'RU',
        audience_auto: true,
        tariff_id: 1,
        budget: 5000,
        duration: 30,
        user_id: 1,
    });
    const [tariffs, setTariffs] = useState<Tariff[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const fetchTariffs = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/tariffs');
                if (response.ok) {
                    const data = await response.json();
                    setTariffs(data);
                } else {
                    console.error('Failed to fetch tariffs');
                }
            } catch (error) {
                console.error('Error fetching tariffs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTariffs();
    }, []);

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleContentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            content_type: e.target.value as 'stream' | 'video',
        });
    };

    const handleTariffChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({
            ...formData,
            tariff_id: e.target.value as number,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('Please log in first');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Campaign created successfully!');
                // Reset form
                setFormData({
                    goal: '',
                    content_type: '',
                    channel_url: '',
                    channel_nickname: '',
                    game_genre: '',
                    audience_age: '18-25',
                    audience_region: 'RU',
                    audience_auto: true,
                    tariff_id: 1,
                    budget: 5000,
                    duration: 30,
                    user_id: 1,
                });
                setActiveStep(0); // Вернуть на первый шаг
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.detail || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during campaign creation:', error);
            alert('Network error. Please try again later.');
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    // Фон для каждого шага (parallax)
    const backgrounds = [
        'https://source.unsplash.com/1600x900/?gaming,livestream', // Цель
        'https://source.unsplash.com/1600x900/?streamer,setup', // Информация
        'https://source.unsplash.com/1600x900/?audience,target', // Аудитория
        'https://source.unsplash.com/1600x900/?pricing,business', // Тариф
        'https://source.unsplash.com/1600x900/?success,done', // Подтверждение
    ];

    return (
        <Container component="main" maxWidth="md">
            {/* Parallax Box для текущего шага */}
            <Box
                sx={{
                    backgroundImage: `url(${backgrounds[activeStep]})`,
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    py: 8,
                    borderRadius: 4,
                    boxShadow: 8,
                }}
            >
                <Paper elevation={0} sx={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', p: 3, borderRadius: 4 }}>
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
                        {/* Шаг 1: Цель кампании */}
                        {activeStep === 0 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Какова цель вашей кампании?
                                </Typography>
                                <Tooltip title="Выбор цели позволит системе правильно подобрать настройки продвижения." arrow>
                                    <IconButton size="small" sx={{ ml: 1 }}>
                                        <Info />
                                    </IconButton>
                                </Tooltip>
                                <FormControl fullWidth required sx={{ mb: 2 }}>
                                    <InputLabel>Цель</InputLabel>
                                    <Select
                                        name="goal"
                                        value={formData.goal}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="subscribers">Привлечь новых подписчиков</MenuItem>
                                        <MenuItem value="views">Увеличить количество просмотров</MenuItem>
                                        <MenuItem value="streams">Популяризовать стрим</MenuItem>
                                        <MenuItem value="discord">Продвинуть Discord-сервер</MenuItem>
                                    </Select>
                                </FormControl>

                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                    Выберите тип контента:
                                </Typography>
                                <RadioGroup
                                    name="content_type"
                                    value={formData.content_type}
                                    onChange={handleContentTypeChange}
                                    row
                                >
                                    <FormControlLabel value="stream" control={<Radio />} label="Стримы (Twitch)" />
                                    <FormControlLabel value="video" control={<Radio />} label="Видеоблог (YouTube)" />
                                </RadioGroup>
                            </Box>
                        )}

                        {/* Шаг 2: Информация о канале */}
                        {activeStep === 1 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Информация о вашем канале
                                </Typography>
                                <TextField
                                    name="channel_url"
                                    fullWidth
                                    label="Ссылка на канал"
                                    value={formData.channel_url}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    name="channel_nickname"
                                    fullWidth
                                    label="Ник на канале"
                                    value={formData.channel_nickname}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <FormControl fullWidth required sx={{ mb: 2 }}>
                                    <InputLabel>Жанр</InputLabel>
                                    <Select
                                        name="game_genre"
                                        value={formData.game_genre}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="gta">GTA / Миссии</MenuItem>
                                        <MenuItem value="valorant">Valorant</MenuItem>
                                        <MenuItem value="just_chatting">Just Chatting</MenuItem>
                                        <MenuItem value="minecraft">Minecraft</MenuItem>
                                        <MenuItem value="other">Другое</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        )}

                        {/* Шаг 3: Целевая аудитория */}
                        {activeStep === 2 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Целевая аудитория
                                </Typography>
                                <FormControl fullWidth required sx={{ mb: 2 }}>
                                    <InputLabel>Возраст</InputLabel>
                                    <Select
                                        name="audience_age"
                                        value={formData.audience_age}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="13-17">13-17 лет</MenuItem>
                                        <MenuItem value="18-25">18-25 лет</MenuItem>
                                        <MenuItem value="26-35">26-35 лет</MenuItem>
                                        <MenuItem value="36+">36+ лет</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth required sx={{ mb: 2 }}>
                                    <InputLabel>Регион</InputLabel>
                                    <Select
                                        name="audience_region"
                                        value={formData.audience_region}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="RU">Россия</MenuItem>
                                        <MenuItem value="CIS">СНГ</MenuItem>
                                        <MenuItem value="WW">Мир</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControlLabel
                                    control={
                                        <input
                                            type="checkbox"
                                            checked={formData.audience_auto}
                                            onChange={(e) => setFormData({...formData, audience_auto: e.target.checked})}
                                        />
                                    }
                                    label="Довериться системе (автоопределение)"
                                />
                            </Box>
                        )}

                        {/* Шаг 4: Тариф и опции */}
                        {activeStep === 3 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Выберите тариф
                                </Typography>
                                <Grid container spacing={2}>
                                    {tariffs.map((tariff) => (
                                        <Grid size={{ xs: 12, md: 4 }} key={tariff.id}>
                                            <Card
                                                sx={{
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    background: tariff.id === formData.tariff_id ? 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)' : 'white',
                                                    color: tariff.id === formData.tariff_id ? 'white' : 'inherit',
                                                    borderRadius: 4,
                                                    boxShadow: 6,
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-5px)',
                                                        boxShadow: 10,
                                                    },
                                                }}
                                                onClick={() => setFormData({ ...formData, tariff_id: tariff.id })}
                                            >
                                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                                    <Typography variant="h6" component="h3" gutterBottom align="center">
                                                        {tariff.name}
                                                    </Typography>
                                                    <Typography variant="h5" align="center" gutterBottom>
                                                        {tariff.price} ₽
                                                    </Typography>
                                                    <ul>
                                                        {tariff.services.map((service, i) => (
                                                            <li key={i}>{service}</li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                                <TextField
                                    name="budget"
                                    fullWidth
                                    label="Бюджет (₽)"
                                    type="number"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    name="duration"
                                    fullWidth
                                    label="Срок (дней)"
                                    type="number"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    sx={{ mt: 2 }}
                                />
                            </Box>
                        )}

                        {/* Шаг 5: Подтверждение */}
                        {activeStep === 4 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Подтвердите данные кампании
                                </Typography>
                                <Typography><strong>Цель:</strong> {formData.goal}</Typography>
                                <Typography><strong>Тип контента:</strong> {formData.content_type === 'stream' ? 'Стримы' : 'Видеоблог'}</Typography>
                                <Typography><strong>Ссылка:</strong> {formData.channel_url}</Typography>
                                <Typography><strong>Жанр:</strong> {formData.game_genre}</Typography>
                                <Typography><strong>Бюджет:</strong> {formData.budget} ₽</Typography>
                                <Typography><strong>Срок:</strong> {formData.duration} дней</Typography>
                            </Box>
                        )}

                        {/* Кнопки управления */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                startIcon={<ArrowBackIos />}
                                variant="outlined"
                                color="primary"
                                sx={{
                                    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)',
                                    },
                                }}
                            >
                                Назад
                            </Button>
                            <Button
                                type="submit"
                                endIcon={<ArrowForwardIos />}
                                variant="contained"
                                color="primary"
                                sx={{
                                    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)',
                                    },
                                }}
                            >
                                {activeStep === steps.length - 1 ? 'Создать кампанию' : 'Далее'}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default CreateCampaignForm;
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Step,
    StepLabel,
    Stepper,
    Tooltip,
    IconButton,
    RadioGroup,
    FormControlLabel,
    Radio,
    Card,
    CardContent,
    CardActions,
    Checkbox,
    FormControlLabel as MuiFormControlLabel,
    CircularProgress,
} from '@mui/material';
import { Info, CheckCircle, ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Tariff {
    id: number;
    name: string;
    price: number;
    services: string[];
}

interface FormData {
    goal: string;
    channel_url: string;
    video_url: string;
    audience_location: string;
    audience_demo: string;
    audience_auto_location: boolean;
    audience_auto_demo: boolean;
    budget: number;
    duration: number;
    tariff_id: number;
    user_id: number; // временно
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
        channel_url: '',
        video_url: '',
        audience_location: 'RU',
        audience_demo: '18-25',
        audience_auto_location: true, // довериться системе
        audience_auto_demo: true,
        budget: 5000,
        duration: 30,
        tariff_id: 1,
        user_id: 1, // временно
    });
    const [tariffs, setTariffs] = useState<Tariff[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        // Заглушка для тарифов (заменить на реальный fetch)
        setTariffs([
            { id: 1, name: 'Silver Package', price: 3990, services: ['Обложки', 'Иконки', 'Шапка'] },
            { id: 2, name: 'Gold Package', price: 7490, services: ['OBS-шаблоны', 'Discord-сервер', 'Контент-план'] },
            { id: 3, name: 'Platinum Package', price: 15890, services: ['Всё включено', 'Поддержка 1 месяц', 'Стратегия'] },
        ]);
        setLoading(false);

        // Или:
        // const fetchTariffs = async () => {
        //     try {
        //         const response = await fetch('http://127.0.0.1:8000/tariffs');
        //         if (response.ok) {
        //             const data = await response.json();
        //             setTariffs(data);
        //         }
        //     } catch (error) {
        //         console.error('Error fetching tariffs:', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // fetchTariffs();
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

    const handleAutoToggle = (field: 'audience_auto_location' | 'audience_auto_demo') => {
        setFormData({
            ...formData,
            [field]: !formData[field],
        });
    };

    const handleTariffChange = (id: number) => {
        setFormData({
            ...formData,
            tariff_id: id,
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
                    channel_url: '',
                    video_url: '',
                    audience_location: 'RU',
                    audience_demo: '18-25',
                    audience_auto_location: true,
                    audience_auto_demo: true,
                    budget: 5000,
                    duration: 30,
                    tariff_id: 1,
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

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
                    {/* Шаг 1: Цель кампании */}
                    {activeStep === 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Какова цель вашей кампании?
                            </Typography>
                            <Tooltip title="Выбор цели позволит системе правильно подобрать настройки продвижения и рекламные форматы." arrow>
                                <IconButton size="small">
                                    <Info />
                                </IconButton>
                            </Tooltip>
                            <FormControl fullWidth required sx={{ mt: 1 }}>
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
                        </Box>
                    )}

                    {/* Шаг 2: Информация о канале */}
                    {activeStep === 1 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Информация о канале
                            </Typography>
                            <TextField
                                name="channel_url"
                                fullWidth
                                label="Ссылка на YouTube-канал"
                                value={formData.channel_url}
                                onChange={handleChange}
                                sx={{ mt: 1 }}
                            />
                            <Tooltip title="Чтобы скопировать адрес YouTube канала из браузера:" arrow>
                                <IconButton size="small">
                                    <Info />
                                </IconButton>
                            </Tooltip>
                            <TextField
                                name="video_url"
                                fullWidth
                                label="Ссылка на видео (необязательно)"
                                value={formData.video_url}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                            />
                            <Tooltip title="Чтобы скопировать адрес YouTube ролика из браузера:" arrow>
                                <IconButton size="small">
                                    <Info />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}

                    {/* Шаг 3: Целевая аудитория */}
                    {activeStep === 2 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Целевая аудитория
                            </Typography>

                            {/* Регион */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.audience_auto_location}
                                            onChange={() => handleAutoToggle('audience_auto_location')}
                                        />
                                    }
                                    label={
                                        <>
                                            <CheckCircle sx={{ mr: 1 }} /> Доверьтесь системе (рекомендуемый способ)
                                        </>
                                    }
                                />
                                <Tooltip title="Система проанализирует ваши ролики и определит местоположение наиболее заинтересованных зрителей." arrow>
                                    <IconButton size="small">
                                        <Info />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            {!formData.audience_auto_location && (
                                <FormControl fullWidth sx={{ mt: 1 }}>
                                    <InputLabel>Регион</InputLabel>
                                    <Select
                                        name="audience_location"
                                        value={formData.audience_location}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="RU">Россия</MenuItem>
                                        <MenuItem value="CIS">СНГ</MenuItem>
                                        <MenuItem value="WW">Мир</MenuItem>
                                    </Select>
                                </FormControl>
                            )}

                            {/* Пол/Возраст */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.audience_auto_demo}
                                            onChange={() => handleAutoToggle('audience_auto_demo')}
                                        />
                                    }
                                    label={
                                        <>
                                            <CheckCircle sx={{ mr: 1 }} /> Доверьтесь системе (рекомендуемый способ)
                                        </>
                                    }
                                />
                                <Tooltip title="Система проанализирует ваши видео и определит пол и возраст зрителей, которым ваш контент будет максимально интересен." arrow>
                                    <IconButton size="small">
                                        <Info />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            {!formData.audience_auto_demo && (
                                <FormControl fullWidth sx={{ mt: 1 }}>
                                    <InputLabel>Возраст</InputLabel>
                                    <Select
                                        name="audience_demo"
                                        value={formData.audience_demo}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="13-17">13-17</MenuItem>
                                        <MenuItem value="18-25">18-25</MenuItem>
                                        <MenuItem value="26-35">26-35</MenuItem>
                                        <MenuItem value="36+">36+</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Box>
                    )}

                    {/* Шаг 4: Тариф и опции */}
                    {activeStep === 3 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Выберите тариф
                            </Typography>
                            <Grid container spacing={2}>
                                {tariffs.map((tariff) => (
                                    <Grid size={{ xs: 12, md: 4 }} key={tariff.id}>
                                        <Card
                                            sx={{
                                                border: tariff.id === formData.tariff_id ? '2px solid #007bff' : '1px solid #ddd',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    boxShadow: 3,
                                                },
                                            }}
                                            onClick={() => handleTariffChange(tariff.id)}
                                        >
                                            <CardContent>
                                                <Typography variant="h6">{tariff.name}</Typography>
                                                <Typography variant="h5" color="primary">{tariff.price} ₽</Typography>
                                                <ul>
                                                    {tariff.services.map((s, i) => (
                                                        <li key={i}>{s}</li>
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
                                label="Продолжительность (дни)"
                                type="number"
                                value={formData.duration}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                            />
                            <Tooltip title="Чаще всего продвижение происходит из расчета на 1 месяц." arrow>
                                <IconButton size="small">
                                    <Info />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}

                    {/* Шаг 5: Подтверждение */}
                    {activeStep === 4 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Подтверждение данных
                            </Typography>
                            <Typography><strong>Цель:</strong> {formData.goal}</Typography>
                            <Typography><strong>Канал:</strong> {formData.channel_url}</Typography>
                            <Typography><strong>Видео:</strong> {formData.video_url || 'Не указано'}</Typography>
                            <Typography><strong>Регион:</strong> {formData.audience_auto_location ? 'Система' : formData.audience_location}</Typography>
                            <Typography><strong>Возраст:</strong> {formData.audience_auto_demo ? 'Система' : formData.audience_demo}</Typography>
                            <Typography><strong>Тариф:</strong> {tariffs.find(t => t.id === formData.tariff_id)?.name}</Typography>
                            <Typography><strong>Бюджет:</strong> {formData.budget} ₽</Typography>
                            <Typography><strong>Продолжительность:</strong> {formData.duration} дней</Typography>
                        </Box>
                    )}

                    {/* Кнопки навигации */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            startIcon={<ArrowBackIos />}
                            variant="outlined"
                        >
                            Назад
                        </Button>
                        <Button
                            type="submit"
                            endIcon={<ArrowForwardIos />}
                            variant="contained"
                            color="primary"
                        >
                            {activeStep === steps.length - 1 ? 'Создать кампанию' : 'Далее'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateCampaignForm;
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
} from '@mui/material';

interface Tariff {
    id: number;
    name: string;
    price: number;
    services: string[];
}

interface FormData {
    title: string;
    description: string;
    budget: number;
    tariff_id: number;
    user_id: number;
}

const CreateCampaignForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        budget: 0,
        tariff_id: 1,
        user_id: 1, //временно
    });
    const [tariffs, setTariffs] = useState<Tariff[]>([]);
    const [loading, setLoading] = useState(true);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'budget' ? Number(value) : value,
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
                    title: '',
                    description: '',
                    budget: 0,
                    tariff_id: 1,
                    user_id: 1,
                });
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
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                <Typography component="h1" variant="h5">
                    Create New Campaign
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                name="title"
                                required
                                fullWidth
                                label="Campaign Title"
                                autoFocus
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="description"
                                required
                                fullWidth
                                label="Description"
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="budget"
                                required
                                fullWidth
                                label="Budget (₽)"
                                type="number"
                                value={formData.budget}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Tariff</InputLabel>
                                <Select
                                    value={formData.tariff_id}
                                    onChange={handleTariffChange}
                                >
                                    {tariffs.map((tariff) => (
                                        <MenuItem key={tariff.id} value={tariff.id}>
                                            {tariff.name} ({tariff.price} ₽)
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create Campaign
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateCampaignForm;
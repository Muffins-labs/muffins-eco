import React, { useState } from 'react';
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
} from '@mui/material';

interface FormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    channelUrl: string;
    role: 'streamer' | 'master';
}

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        channelUrl: '',
        role: 'streamer',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRoleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({
            ...formData,
            role: e.target.value as 'streamer' | 'master',
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            email: formData.email,
            password: formData.password,
            role: formData.role,
            first_name: formData.firstName,
            last_name: formData.lastName || null,
            channel_url: formData.channelUrl || null,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('Registration successful!');
                // Сброс формы
                setFormData({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    channelUrl: '',
                    role: 'streamer',
                });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.detail || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Network error. Please try again later.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* Обновлённые пропсы для Grid */}
                    <Grid container spacing={2}>
                        <Grid size={12}> {/* вместо item xs={12} */}
                            <TextField
                                name="email"
                                required
                                fullWidth
                                label="Email Address"
                                autoFocus
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}> {/* вместо item xs={12} */}
                            <TextField
                                name="password"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}> {/* вместо item xs={12} sm={6} */}
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}> {/* вместо item xs={12} sm={6} */}
                            <TextField
                                name="lastName"
                                fullWidth
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}> {/* вместо item xs={12} */}
                            <TextField
                                name="channelUrl"
                                fullWidth
                                label="Channel URL"
                                placeholder="https://twitch.tv/username"
                                value={formData.channelUrl}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}> {/* вместо item xs={12} */}
                            <FormControl fullWidth required>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    value={formData.role}
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem value="streamer">Streamer</MenuItem>
                                    <MenuItem value="master">Master (Creator)</MenuItem>
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
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterForm;
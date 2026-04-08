import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
    Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface User {
    id: number;
    email: string;
    role: string;
    first_name: string;
    last_name: string | null;
    channel_url: string | null;
}

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Проверяем, есть ли токен (заглушка)
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('Please log in first');
            window.location.href = '/login';
            return;
        }

        // ВРЕМЕННАЯ ЗАГЛУШКА: используем email из localStorage
        const email = localStorage.getItem('current_user_email') || 'guest@example.com';
        setUser({
            id: 1,
            email: email,
            role: 'streamer',
            first_name: 'Guest',
            last_name: null,
            channel_url: 'https://twitch.tv/guest',
        });
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return <Typography variant="h6">No user data available.</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome, {user.first_name}!
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Email" secondary={user.email} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Role" secondary={user.role} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Channel URL" secondary={user.channel_url || 'Not set'} />
                    </ListItem>
                </List>
                
                {/* Кнопка создания кампании */}
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" component={Link} to="/create-campaign">
                        Create Campaign
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Dashboard;
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
} from '@mui/material';

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
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert('Please log in first');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    alert('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                alert('Network error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
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
            </Paper>
        </Container>
    );
};

export default Dashboard;
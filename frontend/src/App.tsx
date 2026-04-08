import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function App() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', my: 8 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Muffins Platform!
                </Typography>
                <Typography variant="h5" color="textSecondary">
                    Promote your streams and grow your audience
                </Typography>
            </Box>
        </Container>
    );
}

export default App;
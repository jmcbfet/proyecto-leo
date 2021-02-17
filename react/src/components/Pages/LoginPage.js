import React from 'react';
import Typography from '@material-ui/core/Typography'
import Navbar from '../Layout/Navbar';

const LoginPage = () => {
    return (
        <div>
            <Navbar />
            <Typography 
                variant="h1" 
                color="initial"
            >
                LoginPage
            </Typography>
        </div>
    )
}

export default LoginPage;
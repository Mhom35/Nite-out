import React from 'react'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BannerImage from './assets/city-landscape.webp'
import BannerLayout from './BannerLayout'
import './App.css'


const Banner = () => {
    const navigate = useNavigate()
    const handleGetStartedClick = () => {
        navigate(`/trips/new`)
    }

    return (
        <BannerLayout
            sxBackground={{
                backgroundImage: `url(${BannerImage})`,
                backgroundColor: '#7fc7d9',
                backgroundPosition: 'center',
            }}
        >
            <img
                style={{ display: 'none' }}
                src={BannerImage}
                alt="increase priority"
            />
            <Typography color="inherit" align="center" variant="h3" marked="center">
                Nite Out
            </Typography>
            <Typography
                color="inherit"
                align="center"
                variant="h5"
                sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
            >
                Find the most popular bars to plan your next night out.
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
                <Button variant="contained" color="secondary" onClick={handleGetStartedClick}>
                    Get Started
                </Button>
            </Typography>
        </BannerLayout>
    )
}

export default Banner

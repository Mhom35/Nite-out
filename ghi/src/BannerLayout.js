import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const BannerLayoutRoot = styled('section')(({ theme }) => ({
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        height: '80vh',
        minHeight: 500,
        maxHeight: 1300,
    },
}));

const Background = styled(Box)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
});

function BannerLayout(props) {
    const { sxBackground, children } = props;

    return (
        <>
            <BannerLayoutRoot>
                <Container
                    sx={{
                        mt: 3,
                        mb: 14,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {children}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: 'common.black',
                            opacity: 0.5,
                            zIndex: -1,
                        }}
                    />
                    <Background sx={sxBackground} />
                </Container>
            </BannerLayoutRoot>

            <Box sx={{ bgcolor: "#b5b5b0", p: 5 }} component="footer">
                <Typography variant="subtitle1" align="left" gutterBottom>
                    Copyright © 2022 Triple Threat
                </Typography>
                <Typography
                    variant="caption"
                    align="left"
                    color="text.secondary"
                    component="p"
                >
                    Mitchell Hom, Tyler Dempsey, Derrick Wan
                </Typography>
            </Box>
        </>
    );
}

BannerLayout.propTypes = {
    children: PropTypes.node,
    sxBackground: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

export default BannerLayout;

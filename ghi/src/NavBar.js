import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalBar from "@mui/icons-material/LocalBar";
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function NavBar() {
    // const [openNavMenu, setOpenNavMenu] = React.useState(null);
    // const [closeNavMenu, setCloseNavMenu] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    // const handleOpenNavMenu = (event) => {
    //     setOpenNavMenu(event.currentTarget);
    // };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // const handleCloseNavMenu = () => {
    //     // setOpenNavMenu(null);
    //     setCloseNavMenu(null);
    // };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleTopTripsClick = () => {
        navigate(`/trips`);
    };

    const handleLoginClick = () => {
        navigate(`/login`);
    };

    const handleLogoutClick = () => {
        navigate(`/logout`);
    };

    const handleCreateTripClick = () => {
        navigate(`/trips/new`);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LocalBar sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "#88A5E6",
                            textDecoration: "none",
                        }}
                    >
                        NiteOut
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button
                            key="Top Trips"
                            onClick={handleTopTripsClick}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            Top Trips
                        </Button>
                        <Button
                            key="Create Trip"
                            onClick={handleCreateTripClick}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            Create a Trip
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="login" onClick={handleLoginClick}>
                                <NavLink textalign="center" style={{ textDecoration: "none" }}>
                                    Login
                                </NavLink>
                            </MenuItem>
                            <MenuItem key="login" onClick={handleLogoutClick}>
                                {/* <Button textAlign="center">Logout</Button> */}
                                <NavLink textalign="center" style={{ textDecoration: "none" }}>
                                    Logout
                                </NavLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;

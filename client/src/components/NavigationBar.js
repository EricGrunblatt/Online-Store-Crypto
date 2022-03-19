import React from "react";
import { useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import { useHistory} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import logo from "../images/CryptoriumLogo.png";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { MenuItem, Menu, AppBar, Toolbar, Box } from '@mui/material'


export default function NavigationBar() {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    let isMenuOpen = Boolean(anchorEl);
    let loggedIn = true;
    let navBarLoggedIn = "";

    /* OPENS MENU IF PRESSED */
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /* CLOSES MENU IF PRESSED */
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    /* cHECKS IF USER IS LOGGED IN TO DECIDE WHAT GOES ON BANNER */
    if(!loggedIn) {
        navBarLoggedIn = 
        <a href onClick={handleLogin} style={{ cursor: 'pointer', float: 'right', margin: '55px 0px 0px 40px', width: '25%', color: '#879ED9', fontSize: '25px'}}>
            Login/Register
        </a>
    }
    else {
        navBarLoggedIn = 
        <Box style={{ display: 'flex', float: 'right', margin: '60px 10px 0px 20px' }}>
            <ShoppingCartRoundedIcon onClick={() => { history.push("/cart") }} style={{ cursor: 'pointer', fontSize: '45px', marginRight: '40px' }}></ShoppingCartRoundedIcon>
            <AccountCircleRoundedIcon onClick={handleProfileMenuOpen} 
            style={{ cursor: 'pointer', color: 'white', fontSize: '45px' }}></AccountCircleRoundedIcon>
        </Box>   
    }

    /* OPENS LOGIN MODAL IF PRESSED */
    function handleLogin() {
        store.setOpenLoginModal();
    }

    function handleLogout() {
        handleMenuClose();
    }

    function handleProfile() {
        handleMenuClose();
        history.push("/profile");
    }

    function handleWallet() {
        handleMenuClose();
        history.push("/wallet");
    }

    function handleOrders() {
        handleMenuClose();
        history.push("/orders");
    }

    function handleListings() {
        handleMenuClose();
        history.push("/listings");
    }

    /* MENU DISPLAY */
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id="account-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={ handleProfile }>Profile</MenuItem>
            <MenuItem onClick={ handleWallet }>Wallet</MenuItem>
            <MenuItem onClick={ handleOrders }>Orders</MenuItem>
            <MenuItem onClick={ handleListings }>Listings</MenuItem>
            <hr style={{ width: '50px' }}></hr>
            <MenuItem onClick={ handleLogout }>Log Out</MenuItem>
        </Menu>        


    return (
        <Box id="navigation-bar">
            <AppBar position="static" style={{ height: '15%', background: 'black' }}>
                <Toolbar>
                    <div sx={{ width: '25%' }} style={{ margin: '50px 0px 0px 0px', justifyContent: 'center', float: 'left' }}>
                        <img onClick={() => { history.push("/") }} src={logo} alt="" width="200" height="40" style={{ cursor: 'pointer', marginBottom: '5px', marginLeft: '1px'}}></img>
                        <div id="navigation-slogan" style={{ marginLeft: '3px' }}>
                            Buy and Sell Items with <br></br>
                            Cryptocurrency
                        </div>
                    </div>
                    <TextField className="search-bar" sx={{ width: '70%', bgcolor:'white' }}
                            style={{ margin: '60px 0px 0px 5px', float: 'right', borderRadius: '10px' }}
                            placeholder="Search..."
                    >
                    </TextField>
                    {navBarLoggedIn}
                </Toolbar>
            </AppBar>
            {
                loggedInMenu
            }
            
        </Box>
        
    )
}
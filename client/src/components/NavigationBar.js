import React from "react";
import { useContext, useState, useEffect } from "react";
import { GlobalStoreContext } from '../store'
import { useHistory} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import logo from "../images/CryptoriumLogo.png";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { MenuItem, Menu, AppBar, Toolbar, Box } from '@mui/material';
import AuthContext from '../auth';


export default function NavigationBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    let isMenuOpen = Boolean(anchorEl);
    let navBarLoggedIn = "";

    useEffect(() => {
        store.initialLoad();
        console.log("NavigationBar.js");
    }, []);

    /* OPENS MENU IF PRESSED */
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /* CLOSES MENU IF PRESSED */
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    /* cHECKS IF USER IS LOGGED IN TO DECIDE WHAT GOES ON BANNER */
    if(!auth.loggedIn) {
        navBarLoggedIn = 
        <div onClick={handleLogin} style={{ cursor: 'pointer', float: 'right', margin: '65px 0px 0px 7vw', color: '#879ED9', fontSize: '25px'}}>
            Login/Register
        </div>
    }
    else {
        let profilePicture = "";
        if(auth.user.profileImage === null || auth.user.profileImage === undefined) {
            profilePicture = <AccountCircleRoundedIcon onClick={handleProfileMenuOpen} style={{ cursor: 'pointer', color: 'white', fontSize: '45px' }}></AccountCircleRoundedIcon>; 
        } else {
            let image = auth.user.profileImage;
            let url = `data:${image.mimetype};base64,${Buffer.from(image.data).toString('base64')}`;
            profilePicture = <img src={url} alt={<AccountCircleRoundedIcon style={{ cursor: 'pointer', color: 'white', fontSize: '45px' }}></AccountCircleRoundedIcon>} onClick={handleProfileMenuOpen} style={{ cursor: 'pointer', width: '45px', height: '45px', border: 'white 1px solid', borderRadius: '50%'}}/>
        }
        navBarLoggedIn = 
        <Box style={{ display: 'flex', float: 'right', margin: '60px 1vw 0px 7vw' }}>
            <ShoppingCartRoundedIcon onClick={() => { history.push("/cart") }} style={{ cursor: 'pointer', fontSize: '45px', marginRight: '5vw' }}></ShoppingCartRoundedIcon>
            {profilePicture}
        </Box>   
    }

    /* OPENS LOGIN MODAL IF PRESSED */
    function handleLogin() {
        store.setOpenLoginModal();
    }

    function handleLogout() {
        handleMenuClose();
        auth.logoutUser();
    }

    function handleProfile() {
        handleMenuClose();
        let json = {
            username: auth.user.username
        }
        store.getMyProfile(json);     
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

    function handleHome() {
        let json = {};
        store.loadItems(json);
        history.push("/");
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
                    <div sx={{ width: '25%' }} style={{ margin: '60px 5vw 0px 0px', justifyContent: 'center', float: 'left' }}>
                        <img onClick={() => { handleHome() }} src={logo} alt="" width="200" height="40" style={{ cursor: 'pointer', margin: '0px 0px 5px 1px' }}></img>
                        <div id="navigation-slogan" style={{ marginLeft: '3px' }}>
                            Buy and Sell Items with <br></br>
                            Cryptocurrency
                        </div>
                    </div>
                    <TextField className="search-bar" sx={{ width: '65vw', bgcolor:'white' }}
                            style={{ margin: '70px 0px 0px 0px', float: 'right', borderRadius: '10px' }}
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
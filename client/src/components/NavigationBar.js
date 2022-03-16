import React from "react";
import TextField from '@mui/material/TextField';
import logo from "../images/CryptoriumLogo.png";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


export default function NavigationBar() {

    let loggedIn = true;
    let navBarLoggedIn = "";
    if(loggedIn) {
        navBarLoggedIn = 
        <a href="/login" onClick={handleLoginRegister} style={{ cursor: 'pointer', float: 'right', padding: '45px 0px 0px 0px', width: '25%', color: '#879ED9', fontSize: '25px'}}>
            Login/Register
        </a>
    }
    else {
        navBarLoggedIn = 
        <div style={{ float: 'right', paddingRight: '45px', paddingTop: '40px' }}>
            <ShoppingCartRoundedIcon style={{ fontSize: '45px', paddingRight: '30px' }}></ShoppingCartRoundedIcon>
            <AccountCircleRoundedIcon style={{ fontSize: '45px' }}></AccountCircleRoundedIcon>
        </div>   
    }

    function handleLoginRegister() {

    }


    return (
        <div id="navigation-bar">
            <div sx={{ width: '25%' }} style={{ padding: '20px 0px 0px 10px', justifyContent: 'center', float: 'left' }}>
                <img src={logo} alt="" width="175" height="30" style={{ marginBottom: '5px', marginLeft: '1px'}}></img>
                <div id="navigation-slogan" style={{ marginLeft: '2px' }}>
                    Buy and Sell Items with <br></br>
                    Cryptocurrency
                </div>
            </div>
            <TextField className="search-bar" sx={{ left: '10px', justifyContent: 'center', top: '30%', height: '35%', width: '360px', bgcolor:'white' }}
                    style={{ float: 'left', position: 'relative', borderRadius: '10px' }}
                    placeholder="Search..."
            >
            </TextField>
            {navBarLoggedIn}
        </div>
        
    )
}
import React from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ProfileScreen() {
    return (
        <div className="profile-account">
            <div className="profile" style={{ margin: '50px 0% 0px 10%', width: '80%', height: '450px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="profile-left-side" style={{ float: 'left' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '0px 0px 0px 3vw' }}>
                        <div className="display-name-profile" style={{ display: 'flex', margin: '20px 0% 0px 0%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                            <u> Profile </u>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <AccountCircleRoundedIcon style={{ margin: '20px 0px 0px 0', fontSize: '200px' }} />
                        </div>
                        <div style={{ display: 'flex', margin: '30px 0px 0px 0px' }}>
                            <a href style={{ cursor: 'pointer', fontSize: '30px', color: '#879ED9' }}>
                                Change Image
                            </a>
                        </div>
                    </div>   
                </div> 
                <div className="profile-right-side" style={{ float: 'right' }}>
                    <div className="username-textfield">
                        <TextField placeholder="Username" style={{ margin: '120px 2vw 0px 0px', width: '45vw', height: '30px'}}></TextField>
                    </div>
                    <div className="email-address-textfield">
                        <TextField placeholder="Email Address" style={{ margin: '80px 0vw 0px 0px', width: '45vw', height: '30px'}}></TextField>
                    </div>
                    <div className="cancel-save-buttons" style={{ margin: '100px 10px 0px px' }}>
                        <Button style={{ margin: '100px 4vw 0px 0px', width: '15vw', height: '40px', border: 'black 1px solid', borderRadius: '10px', color: 'black' }}>Cancel</Button>
                        <Button style={{ margin: '100px 0px 0px 0px', width: '15vw', height: '40px', border: 'black 1px solid', borderRadius: '10px', color: 'black' }}>Save</Button>
                    </div>
                </div>        
            </div>
            <div className="account" style={{ margin: '50px 0% 50px 10%', width: '80%', height: '650px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="account-left-side" style={{ float: 'left' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '0px 0px 0px 3vw' }}>
                        <div className="display-name-profile" style={{ display: 'flex', margin: '20px 0% 0px 0%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                            <u> Account </u>
                        </div>
                        <div className="joined-date" style={{ margin: '20px 0px 0px 0px', fontSize: '25px' }}>
                            <div style={{ display: 'inline-block' }}>
                                Joined:
                            </div>
                            <div style={{ display: 'inline-block', margin: '0px 0px 0px 20px' }}>
                                February 2022
                            </div>
                        </div>
                        <div className="first-name-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="First Name" style={{ width: '30vw' }}></TextField>
                        </div>
                        <div className="last-name-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="Last Name" style={{ width: '30vw' }}></TextField>
                        </div>
                        <div className="city-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="City" style={{ width: '30vw' }}></TextField>
                        </div>
                        <div className="state-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="State" style={{ width: '30vw' }}></TextField>
                        </div>
                        <div className="zip-code-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="Zip Code" style={{ width: '30vw' }}></TextField>
                        </div>
                    </div>
                </div>
                <div className="account-right-side" style={{ margin: '75px 3vw 0px 0vw', float: 'right' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '0px 0px 0px 3vw' }}>
                        <div className="old-password-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="Old Password" style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="new-password-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="New Password" style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="confirm-password-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="Confirm Password" style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="address-line-one-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="Address Line 1" style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="address-line-two-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="Address Line 2" style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="phone-number-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField placeholder="Phone Number" style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="account-buttons" style={{ margin: '-60px 0px 0px 0px', float: 'right'}}>
                            <Button style={{ margin: '100px 4vw 0px 0px', width: '15vw', height: '40px', border: 'black 1px solid', borderRadius: '10px', color: 'black' }}>Cancel</Button>
                            <Button style={{ margin: '100px 0px 0px 0px', width: '15vw', height: '40px', border: 'black 1px solid', borderRadius: '10px', color: 'black' }}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="back-to-profile" style={{ justifyContent: 'center', textAlign: 'center', margin: '-10px 0px 50px 0px' }}>
                <Button className="back-to-profile-button" style={{ background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                    Back to My Profile
                </Button>
            </div>
        </div>
    )
}
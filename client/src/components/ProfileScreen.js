import React from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Button, TextField } from '@mui/material';
import { useContext, useState, useEffect } from "react";
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import api from "../api"
import { useHistory } from "react-router-dom";

export default function ProfileScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressFirstLine, setAddressFirstLine] = useState("");
    const [addressSecondLine, setAddressSecondLine] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        try {
            setEmail(auth.user.email);
            setFirstName(store.userAccount.firstName);
            setLastName(store.userAccount.lastName);
            setAddressFirstLine(store.userAccount.addressFirstLine);
            setAddressSecondLine(store.userAccount.addressSecondLine);
            setCity(store.userAccount.city);
            setState(store.userAccount.state);
            setZipcode(store.userAccount.zipcode);
            setPhoneNumber(store.userAccount.phoneNumber);
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");

            let image = store.userProfile.profileImage;
            // let url = `data:${image.mimetype};base64,${Buffer.from(image.data).toString('base64')}`;
            setProfileImage(image);

            console.log("ProfileScreen.js");
        }  catch (err) {
            console.log(err);
        }
    }, [auth, store.userAccount, store.userProfile])


    const handleBackToOriginal = () => {
        setEmail(auth.user.email);
        setFirstName(store.userAccount.firstName);
        setLastName(store.userAccount.lastName);
        setAddressFirstLine(store.userAccount.addressFirstLine);
        setAddressSecondLine(store.userAccount.addressSecondLine);
        setCity(store.userAccount.city);
        setState(store.userAccount.state);
        setZipcode(store.userAccount.zipcode);
        setPhoneNumber(store.userAccount.phoneNumber);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    }

    // CHANGING PROFILE PICTURE
    let profilePicture = "";

    // FUNCTION CHANGES IT FOR USER TO SEE
    const handleChangeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfileImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    // USES DEFAULT ACCOUNT ICON IF USER DOES NOT HAVE AN IMAGE         
    if(profileImage === null) {
        profilePicture = 
            <div style={{ position: 'absolute' }}>
                <AccountCircleRoundedIcon style={{ margin: '20px 0px 0px 0px', fontSize: '200px' }} />
            </div>
    }
    else {
        profilePicture = 
            <div style={{ position: 'absolute' }}>
                <img src={profileImage} alt={<AccountCircleRoundedIcon style={{ margin: '20px 0px 0px 0px', fontSize: '200px' }}></AccountCircleRoundedIcon>} style={{ margin: '32px 0px 0px 15px', width: '165px', height: '165px', border: 'black 1px solid', borderRadius: '50%'}}/>
            </div>
    }

    const handleChangeInfo = async function() {
        console.log(oldPassword);
        console.log(newPassword);
        console.log(confirmNewPassword);
        let jsonAccountData = {
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "addressFirstLine": addressFirstLine,
            "addressSecondLine": addressSecondLine,
            "city": city,
            "state": state,
            "zipcode": zipcode,
            "phoneNumber": phoneNumber
        }
        if(oldPassword !== "" && newPassword !== "" && confirmNewPassword !== "") {
            jsonAccountData = {
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "addressFirstLine": addressFirstLine,
                "addressSecondLine": addressSecondLine,
                "city": city,
                "state": state,
                "zipcode": zipcode,
                "phoneNumber": phoneNumber,
                "oldPassword": oldPassword,
                "newPassword": newPassword,
                "confirmPassword": confirmNewPassword
            }
            let response = await api.updateAccount(jsonAccountData);
            if(response.data.status === "ERROR") {
                alert(response.data.errorMessage);
                return;
            }

        } else if(oldPassword !== "" || newPassword !== "" || confirmNewPassword !== "") {
            alert("Fill in all password fields if you're changing the password to your account");
            return;
        } else {
            let response = await api.updateAccount(jsonAccountData);
            if(response.data.status === "ERROR") {
                alert(response.data.errorMessage);
                return;
            }
        }
        var formData = new FormData();
        const element = document.getElementById('profilePicture');
        const file = element.files[0];
        if(file !== undefined) {
            formData.append('image', file);
            let newResponse = await api.updateProfilePicture(formData);
            if(newResponse.data.status === "ERROR") {
                alert(newResponse.data.errorMessage);
            }
        }
        
        alert("Your account has been updated");

        auth.getLoggedIn();
        history.push("/");
        window.scrollTo(0, 0);
    }

    console.log(profileImage);
    return (
        <div className="profile-account">
            <div className="profile" style={{ margin: '50px 0% 0px 10%', width: '80%', height: '450px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="profile-left-side" style={{ float: 'left' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '0px 0px 0px 3vw' }}>
                        <div className="display-name-profile" style={{ display: 'flex', margin: '20px 0% 0px 0%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                            <u> My Profile </u>
                        </div> 
                        <div style={{ display: 'flex' }}>
                            {profilePicture}
                        </div>
                        <div style={{ display: 'flex', margin: '250px 0px 0px 0px' }}>
                            <div style={{ fontSize: '30px', color: '#879ED9' }}>
                                <label htmlFor="profilePicture">
                                    <div style={{ cursor: 'pointer' }}><u>Change Image</u></div>
                                </label>
                                <input type='file' name='profilePicture' id='profilePicture' onChange={handleChangeImage} style={{ display: 'none', visibility: 'none' }}></input>  
                        
                            </div>
                        </div>
                    </div>   
                </div> 
                <div className="profile-right-side" style={{ position: 'absolute', margin: '120px 0px 0px 30vw', float: 'right' }}>
                    <div className="email-address-textfield">
                        <TextField
                            value={email} 
                            label='Email'
                            placeholder="Email Address" 
                            onChange={(event) => { setEmail(event.target.value) }}
                            style={{ margin: '0px 2vw 0px 0px', width: '45vw', height: '30px'}}></TextField>
                    </div>
                    <div className="old-password-textfield">
                        <TextField 
                            type="password"
                            value={oldPassword} 
                            label='Old Password'
                            placeholder="Old Password" 
                            onChange={(event) => { setOldPassword(event.target.value) }}
                            style={{ margin: '40px 2vw 0px 0px', width: '45vw', height: '30px'}}></TextField>
                    </div>
                    <div className="new-password-textfield">
                        <TextField 
                            type="password"
                            value={newPassword} 
                            label='New Password'
                            placeholder="New Password" 
                            onChange={(event) => { setNewPassword(event.target.value) }}
                            style={{ margin: '40px 2vw 0px 0px', width: '45vw', height: '30px'}}></TextField>
                    </div>
                    <div className="new-password-confirm-textfield">
                        <TextField 
                            type="password"
                            value={confirmNewPassword} 
                            label='Confirm New Password'
                            placeholder="Confirm New Password" 
                            onChange={(event) => { setConfirmNewPassword(event.target.value) }}
                            style={{ margin: '40px 2vw 0px 0px', width: '45vw', height: '30px'}}></TextField>
                    </div>
                </div>        
            </div>
            <div className="account" style={{ margin: '50px 0% 50px 10%', width: '80%', height: '575px', border: 'black 2px solid', borderRadius: '20px' }}>
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
                                {store.userProfile.dateJoined.substring(0, 10)}
                            </div>
                        </div>
                        <div className="first-name-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField 
                                value={firstName} 
                                label='First Name'
                                placeholder="First Name" 
                                onChange={(event) => { setFirstName(event.target.value) }}
                                style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="address-line-one-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField 
                                value={addressFirstLine} 
                                label='Address Line 1'
                                placeholder="Address Line 1" 
                                onChange={(event) => { setAddressFirstLine(event.target.value) }} 
                                style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="city-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField 
                                value={city} 
                                label='City'
                                placeholder="City" 
                                onChange={(event) => { setCity(event.target.value) }}
                                style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="zipcode-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField 
                                value={zipcode} 
                                label='Zip Code'
                                placeholder="Zip Code" 
                                onChange={(event) => { setZipcode(event.target.value) }}
                                style={{ width: '35vw' }}></TextField>
                        </div>
                    </div>
                </div>
                <div className="account-right-side" style={{ position: 'absolute', margin: '152px 3vw 0px 37.5vw', float: 'right' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: '0px 0px 0px 3vw' }}>
                        <div className="last-name-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField 
                                value={lastName} 
                                label='Last Name'
                                placeholder="Last Name" 
                                onChange={(event) => { setLastName(event.target.value) }} 
                                style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="address-line-two-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField 
                                value={addressSecondLine} 
                                label='Address Line 2'
                                placeholder="Address Line 2" 
                                onChange={(event) => { setAddressSecondLine(event.target.value) }} 
                                style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="state-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField 
                                value={state} 
                                label='State'
                                placeholder="State" 
                                onChange={(event) => { setState(event.target.value) }}
                                style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="phone-number-textfield" style={{ margin: '20px 0px 0px 0px' }}>
                            <TextField 
                                value={phoneNumber} 
                                label='Phone Number'
                                placeholder="Phone Number" 
                                onChange={(event) => { setPhoneNumber(event.target.value) }}
                                style={{ width: '35vw' }}></TextField>
                        </div>
                        <div className="account-buttons" style={{ margin: '-60px 0px 0px 0px', float: 'right'}}>
                            <Button onClick={() => { handleBackToOriginal() }} style={{ margin: '100px 4vw 0px 0px', width: '15vw', height: '40px', border: 'black 1px solid', borderRadius: '10px', color: 'black' }}>Cancel</Button>
                            <Button onClick={() => { handleChangeInfo() }} style={{ margin: '100px 0px 0px 0px', width: '15vw', height: '40px', border: 'black 1px solid', borderRadius: '10px', color: 'black' }}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="back-to-profile" style={{ justifyContent: 'center', textAlign: 'center', margin: '-10px 0px 50px 0px' }}>
                <Button className="back-to-profile-button" onClick={() => { history.push("/myprofile") }} style={{ background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                    Back to My Profile
                </Button>
            </div>
        </div>
    )
}
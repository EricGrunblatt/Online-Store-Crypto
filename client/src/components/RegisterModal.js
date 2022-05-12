import { useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import { Box, Modal, Button, TextField, Alert } from '@mui/material';
import AuthContext from '../auth'
import AccountErrorModal from './AccountErrorModal'
import NumberFormat from 'react-number-format';


/*
    This modal is shown when the user register.
    
    @author Eric Grunblatt
*/
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: 'black 2px solid',
    borderRadius: '20px',
    boxShadow: 24,
    textAlign: 'center',
    pt: 2,
    px: 4,
    pb: 3,
  };

function RegisterModal() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [cont, setCont] = useState(false);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [addressFirst, setAddressFirst] = useState("");
    const [addressSecond, setAddressSecond] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
	const [registerAlert, setRegisterAlert] = useState("");

    let isOpen = false;
    let regexp = /^[0-9\b]+$/;

    if(store.registerModal) {
        isOpen = true;
    }
    const handleContinue = () => {
        setCont(true);
    }

    const handleBack = () => {
        setCont(false);
    }

    const handleRegister = (event) => {
        event.preventDefault();
		if(password && first && last && email && username && addressFirst && city && state && zipcode && phoneNumber) {
			if(password === confirm) {
				store.setCloseRegisterModal();
				auth.registerUser({
					firstName: first,
					lastName: last,
					email: email,
					username: username,
					password: password,
					addressFirstLine: addressFirst,
					addressSecondLine: addressSecond,
					phoneNumber: phoneNumber,
					city: city,
					state: state,
					zipcode: zipcode
				}, store);
			}
			setRegisterAlert(<Alert severity="error">Passwords must match</Alert>);
        }
        else {
			setRegisterAlert(<Alert severity="error">Please fill out all required fields</Alert>);
        }
    }

    function handleLogin() {
        store.setOpenLoginModal();
    }

	function handleCloseModal() {
		store.setCloseRegisterModal();
	}

    let list = "";
    if(!cont) {
        list =
        <div>
            <Box>
                <h1 style={{ margin: '100px 0px 0px 0px' }}>Sign Up With</h1>
                <TextField 
                    required
                    name="firstName"
                    id="firstName"
                    label="First Name" 
                    value={first}
                    onChange={(event) => { setFirst(event.target.value) }}
                    style={{ display: 'flex', float: 'left', margin: '15px 15px 0px 0px', width: '242.5px' }}></TextField>
                <TextField 
                    required
                    name="lastName"
                    id="lastName"
                    label="Last Name" 
                    value={last}
                    onChange={(event) => { setLast(event.target.value) }}
                    style={{ display: 'flex', float: 'right', margin: '15px 0px 0px 0px', width: '242.5px' }}></TextField>
                <TextField 
                    required
                    name="email"
                    id="email"
                    label="Email Address" 
                    value={email}
                    onChange={(event) => { setEmail(event.target.value) }}
                    style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField 
                    required
                    name="username"
                    id="username"
                    label="Username"  
                    value={username}
                    onChange={(event) => { setUsername(event.target.value) }}
                    style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField 
                    required
                    type="password"
                    name="password"
                    id="password"
                    label="Password"  
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                    style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField 
                    required
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    label="Confirm Password"
                    value={confirm} 
                    onChange={(event) => { setConfirm(event.target.value) }}
                    style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
            </Box>
			<Button onClick={handleCloseModal} style={{ margin: '15px 10px 0px 0px', color: 'white', background: 'black', width: '150px', height: '40px', fontSize: '8px', borderRadius: '10px' }}><h1>Close</h1></Button>
            <Button onClick={handleContinue} style={{ margin: '15px 0px 0px 0px', color: 'white', background: 'black', width: '150px', height: '40px', fontSize: '8px', borderRadius: '10px' }}><h1>Continue</h1></Button>
        </div>;
    } else {
        list =
        <div>
            <Box>
                <h1 style={{ margin: '100px 0px 0px 0px' }}>Enter Your Shipping Address</h1>
                <TextField 
                    required
                    name="addressFirstLine"
                    id="addressFirstLine"
                    label="Address Line 1" 
                    value={addressFirst} 
                    onChange={(event) => { setAddressFirst(event.target.value) }}
                    style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField 
                    name="addressSecondLine"
                    id="addressSecondLine"
                    label="Address Line 2" 
                    value={addressSecond} 
                    onChange={(event) => { setAddressSecond(event.target.value) }}
                    style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField 
                    required
                    name="city"
                    id="city"
                    label="City" 
                    value={city} 
                    onChange={(event) => { setCity(event.target.value) }}
                    style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField 
                    required
                    name="state"
                    id="state"
                    label="State" 
                    value={state} 
                    onChange={(event) => { setState(event.target.value) }}
                    style={{ display: 'flex', float: 'left', margin: '15px 15px 0px 0px', width: '242.5px' }}></TextField>
                <TextField 
                    required
                    name="zipcode"
                    id="zipcode"
                    label="Zip Code"  
                    value={zipcode} 
                    onChange={(event) => { 
                        if(event.target.value === '' || regexp.test(event.target.value)) { 
                            setZipcode(event.target.value) 
                        }
                    }}
                    style={{ display: 'flex', float: 'right', margin: '15px 0px 0px 0px', width: '242.5px' }}></TextField>
                {/* <TextField 
                    required
                    name="phoneNumber"
                    id="phoneNumber"
                    label="Phone Number"  
                    value={phoneNumber} 
                    onChange={(event) => { 
                        if(event.target.value === '' || regexp.test(event.target.value)) { 
                            setPhoneNumber(event.target.value) 
                        } 
                    }}
                    style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField> */}
				<NumberFormat format="+1 (###) ###-####" mask="_" 
					required
					placeHolder=" Phone Number*"
					name="phoneNumber"
					id="phoneNumber"
					label="Phone Number"  
					value={phoneNumber} 
					onChange={(event) => { setPhoneNumber(event.target.value) }}
					style={{ marginTop: '15px', float: 'left', width: '495px', height: '45px', borderRadius: '3px' }}/>
					{registerAlert}
                <Button onClick={handleBack} style={{ margin: '15px 20px 0px 0px', color: 'white', background: 'black', width: '150px', height: '40px', fontSize: '8px', borderRadius: '10px' }}><h1>Back</h1></Button>
                <Button onClick={(event) => { handleRegister(event) }} style={{ cursor: 'pointer', margin: '15px 0px 0px 0px', color: 'white', background: 'black', width: '150px', height: '40px', fontSize: '8px', borderRadius: '10px' }}><h1>Register</h1></Button>
            </Box>
        </div>;
    }

    return (
        <div>
            <Modal
                open={isOpen}
                aria-labelledby="delete-modal">
                <Box 
                    className="modal-dialog"
                    sx={{ ...style, width: 500 }}
                >
                    <h1 onClick={handleLogin} className="login" style={{ cursor: 'pointer', margin: '10px 0px 0px 60px', float: 'left', display: 'inline-block' }}>
                        Login
                    </h1>
                    <hr style={{ margin: '30px 0px 0px 78px', display: 'inline-block', float: 'left', color: 'black', width: '50px', rotate: '90deg', background: '#AEAEAE', border: '#AEAEAE 2px solid', borderRadius: '2px'   }}></hr>
                    <h1 className="register" style={{ margin: '10px 60px 0px 0px', float: 'right', display: 'inline-block' }}>
                        Register
                    </h1>
                    <hr style={{ margin: '40px 0px 0px -140px', display: 'inline-block', float: 'left', width: '250px', background: '#AEAEAE', border: '#AEAEAE 2px solid', borderRadius: '2px 0px 0px 2px' }}></hr>
                    <hr style={{ margin: '-4px -0px 0px 0px', display: 'inline-block', float: 'right', width: '250px', background: '#0038FF', border: '#0038FF 2px solid', borderRadius: '0px 2px 2px 0px' }}></hr>
                    <Box component="form" onSubmit={handleRegister} noValidate>
                        {list}
                    </Box>
                </Box>
            </Modal>
            <AccountErrorModal />
        </div>
    );
}

export default RegisterModal;
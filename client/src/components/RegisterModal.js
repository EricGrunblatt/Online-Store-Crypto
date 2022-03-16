import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
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
    const [cont, setCont] = useState(false);
    const [open, setOpen] = useState(false);
    let list = "";

    function handleContinue() {
        setCont(true);
    }

    function handleRegister() {
        setOpen(false);
    }

    if(!cont) {
        list =
        <div>
            <div>
                <h1 style={{ margin: '100px 0px 0px 0px' }}>Sign Up With</h1>
                <TextField placeholder="First Name*" style={{ display: 'flex', float: 'left', margin: '15px 15px 0px 0px', width: '242.5px' }}></TextField>
                <TextField placeholder="Last Name*" style={{ display: 'flex', float: 'right', margin: '15px 0px 0px 0px', width: '242.5px' }}></TextField>
                <TextField placeholder='Email Address*' style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField placeholder='Username*' style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField placeholder='Password*' style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField placeholder='Confirm Password*' style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
            </div>
            <Button onClick={handleContinue} style={{ margin: '15px 0px 0px 0px', color: 'white', background: 'black', width: '150px', height: '40px', fontSize: '8px', borderRadius: '10px' }}><h1>Continue</h1></Button>
        </div>;
    } else {
        list =
        <div>
            <div>
                <h1 style={{ margin: '100px 0px 0px 0px' }}>Enter Your Shipping Address</h1>
                <TextField placeholder='Address Line 1*' style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField placeholder='Address Line 2*' style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField placeholder='Phone Number*' style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField placeholder='City*' style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                <TextField placeholder="State*" style={{ display: 'flex', float: 'left', margin: '15px 15px 0px 0px', width: '242.5px' }}></TextField>
                <TextField placeholder="Zip Code*" style={{ display: 'flex', float: 'right', margin: '15px 0px 0px 0px', width: '242.5px' }}></TextField>
            </div>
            <Button onClick={handleRegister} style={{ margin: '15px 0px 0px 0px', color: 'white', background: 'black', width: '150px', height: '40px', fontSize: '8px', borderRadius: '10px' }}><h1>Register</h1></Button>
        </div>;
    }

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="delete-modal">
                <Box 
                    className="modal-dialog"
                    sx={{ ...style, width: 500 }}
                >
                    <h1 className="login" style={{ margin: '10px 0px 0px 60px', float: 'left', display: 'inline-block' }}>
                        Login
                    </h1>
                    <hr style={{ margin: '30px 0px 0px 78px', display: 'inline-block', float: 'left', color: 'black', width: '50px', rotate: '90deg', background: '#AEAEAE', border: '#AEAEAE 2px solid', borderRadius: '2px'   }}></hr>
                    <h1 className="register" style={{ margin: '10px 60px 0px 0px', float: 'right', display: 'inline-block' }}>
                        Register
                    </h1>
                    <hr style={{ margin: '40px 0px 0px -140px', display: 'inline-block', float: 'left', width: '250px', background: '#AEAEAE', border: '#AEAEAE 2px solid', borderRadius: '2px 0px 0px 2px' }}></hr>
                    <hr style={{ margin: '-4px -0px 0px 0px', display: 'inline-block', float: 'right', width: '250px', background: '#0038FF', border: '#0038FF 2px solid', borderRadius: '0px 2px 2px 0px' }}></hr>

                    {list}

                    
                </Box>
            </Modal>
        </div>
    );
}

export default RegisterModal;
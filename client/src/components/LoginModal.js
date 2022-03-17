import { useContext } from "react";
import { GlobalStoreContext } from '../store'
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
    top: '41%',
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

function LoginModal() {
    const { store } = useContext(GlobalStoreContext);

    let isOpen = false;
    if(store.loginModal) {
        isOpen = true;
    }

    function handleLogin() {
        store.setCloseLoginModal();
    }

    function handleRegister() {
        store.setOpenRegisterModal();
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
                    <h1 className="login" style={{ margin: '10px 0px 0px 60px', float: 'left', display: 'inline-block' }}>
                        Login
                    </h1>
                    <hr style={{ margin: '30px 0px 0px 78px', display: 'inline-block', float: 'left', color: 'black', width: '50px', rotate: '90deg', background: '#AEAEAE', border: '#AEAEAE 2px solid', borderRadius: '2px'   }}></hr>
                    <h1 onClick={handleRegister} className="register" style={{ cursor: 'pointer', margin: '10px 60px 0px 0px', float: 'right', display: 'inline-block' }}>
                        Register
                    </h1>
                    <hr style={{ margin: '40px 0px 0px -140px', display: 'inline-block', float: 'left', width: '250px', background: '#0038FF', border: '#0038FF 2px solid', borderRadius: '2px 0px 0px 2px' }}></hr>
                    <hr style={{ margin: '-4px -0px 0px 0px', display: 'inline-block', float: 'right', width: '250px', background: '#AEAEAE', border: '#AEAEAE 2px solid', borderRadius: '0px 2px 2px 0px' }}></hr>

                    <div>
                        <h1 style={{ margin: '100px 0px 0px 0px' }}>Sign In With</h1>
                        <TextField placeholder='Email Address*' style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                        <TextField placeholder='Password*' style={{ margin: '15px 0px 0px 0px', float: 'left', width: '500px' }}></TextField>
                    </div>
                    <h5 style={{ padding: '0px 0px 0px 0px', color: '#879ED9', fontSize: '20px' }}>Forgot Password?</h5>
                    <Button onClick={handleLogin} style={{ color: 'white', background: 'black', width: '150px', height: '40px', fontSize: '8px', borderRadius: '10px' }}><h1>Login</h1></Button>
                </Box>
            </Modal>
        </div>
    );
}

export default LoginModal;
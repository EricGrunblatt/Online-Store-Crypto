import { useContext } from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AuthContext from '../auth'

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
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: 'center',
    pt: 2,
    px: 4,
    pb: 3,
  };

function AccountErrorModal() {
    const { auth, setErrorMessage } = useContext(AuthContext);

    let errorMessage = "";
    let isOpen = false;
    if(auth.errorMessage) {
        console.log(auth.errorMessage);
        errorMessage = auth.errorMessage;
        isOpen = true;
    }

    function handleCloseModal() {
        setErrorMessage();
        isOpen=false;
    }
    
    return (
        <div>
            <Modal
                open={isOpen}
                aria-labelledby="error-modal">
                <Box 
                    className="modal-dialog"
                    sx={{ ...style, width: 400 }}
                >
                    <Alert severity="error">
                        <AlertTitle>{errorMessage}</AlertTitle>
                    </Alert>
                    <Button 
                        id="dialog-cancel-button"
                        className="modal-button" 
                        onClick={handleCloseModal}
                    >Close</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default AccountErrorModal;
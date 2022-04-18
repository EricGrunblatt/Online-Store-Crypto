import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

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
    border: '3px solid #000',
    boxShadow: 24,
    textAlign: 'center',
    pt: 2,
    px: 4,
    pb: 3,
  };

function TrackingInfoModal() {
    const { store } = useContext(GlobalStoreContext);

    let isOpen = false;
    let buyerInfo = "";

    if(store.buyerAddress) {
        isOpen = true;
        buyerInfo = store.buyerAddress[0];
    }
    
    function handleCloseModal() {
		store.unmarkBuyerAddress();
        isOpen=false;
    }

    console.log(buyerInfo);
    
    return (
        <div>
            <Modal
                open={isOpen}
                aria-labelledby="delete-modal">
                <Box 
                    className="modal-dialog"
                    sx={{ ...style, width: 600 }}
                >
                    <h1 className="dialog-header">
                        Shipping Label Information
                    </h1>
                    <div style={{ color: 'black', fontFamily: 'Quicksand', fontSize: '25px'}}>{buyerInfo.firstName + " " + buyerInfo.lastName}</div>
                    <div style={{ color: 'black', fontFamily: 'Quicksand', fontSize: '25px'}}>{buyerInfo.addressFirstLine}</div>
                    <div style={{ color: 'black', fontFamily: 'Quicksand', fontSize: '25px'}}>{buyerInfo.addressSecondLine}</div>
                    <div style={{ color: 'black', fontFamily: 'Quicksand', fontSize: '25px'}}>{buyerInfo.city + ", " + buyerInfo.state + ", " + buyerInfo.zipcode}</div>
                    <div style={{ color: 'black', fontFamily: 'Quicksand', fontSize: '25px'}}>United States </div>
                    <Button 
                        style={{ margin: '30px 0px 30px 0px', background: 'black', color: 'white', fontFamily: 'Quicksand', fontSize: '18px', width: '150px' }}
                        id="dialog-cancel-button"
                        className="modal-button" 
                        onClick={handleCloseModal}
                    >Close</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default TrackingInfoModal;
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

function ListingsDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    
    let name = "";
    let isOpen = false;

    if(store.listingItemDelete) {
        isOpen = true;
    }

    function handleDeleteListing() {
        console.log("the product id: ", store.listingItemDelete)
        store.unmarkListingDelete();
        isOpen=false;
    }

    function handleCloseModal() {
        store.unmarkListingDelete();
        isOpen=false;
    }
    
    return (
        <div>
            <Modal
                open={isOpen}
                aria-labelledby="delete-modal">
                <Box 
                    className="modal-dialog"
                    sx={{ ...style, width: 400 }}
                >
                    <h2 className="dialog-header">
                        Remove {name} from Listings?
                    </h2>
                    <Button 
                        id="dialog-confirm-button"
                        className="modal-button"
                        onClick={handleDeleteListing}
                    >Confirm</Button>
                    <Button 
                        id="dialog-cancel-button"
                        className="modal-button" 
                        onClick={handleCloseModal}
                    >Cancel</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ListingsDeleteModal;
import { createContext, useState } from 'react'
/*
    This is our global data store.
    
    @author Eric Grunblatt
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    OPEN_LOGIN_MODAL: "OPEN_LOGIN_MODAL",
    CLOSE_LOGIN_MODAL: "CLOSE_LOGIN_MODAL",
    OPEN_REGISTER_MODAL: "OPEN_REGISTER_MODAL",
    CLOSE_REGISTER_MODAL: "CLOSE_REGISTER_MODAL",
    MARK_CART_DELETION: "MARK_CART_DELETION",
    UNMARK_CART_DELETION: "MARK_CART_DELETION",
    MARK_LISTING_DELETION: "MARK_CART_DELETION",
    UNMARK_LISTING_DELETION: "MARK_CART_DELETION",
    STORE_SEARCH_BAR: "STORE_SEARCH_BAR",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        loginModal: false,
        registerModal: false,
        searchBar: null
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.OPEN_LOGIN_MODAL: {
                return setStore({
                    loginModal: true,
                    registerModal: false,
                    searchBar: null,
                });
            }

            case GlobalStoreActionType.CLOSE_LOGIN_MODAL: {
                return setStore({
                    loginModal: false,
                    registerModal: false,
                    searchBar: null,
                });
            }

            case GlobalStoreActionType.OPEN_REGISTER_MODAL: {
                return setStore({
                    loginModal: false,
                    registerModal: true,
                    searchBar: null,
                });
            }

            case GlobalStoreActionType.CLOSE_REGISTER_MODAL: {
                return setStore({
                    loginModal: false,
                    registerModal: false,
                    searchBar: null,
                });
            }

            case GlobalStoreActionType.STORE_SEARCH_BAR: {
                return setStore({
                    loginModal: store.loginModal,
                    registerModal: store.registerModal,
                    searchBar: payload,
                });
            }
            
            default:
                return store;
        }
    }



    // THIS FUNCTION OPENS LOGIN MODAL
    store.setOpenLoginModal = function () {
        storeReducer({
            type: GlobalStoreActionType.OPEN_LOGIN_MODAL,
            payload: null
        });
    }

    // THIS FUNCTION CLOSES LOGIN MODAL
    store.setCloseLoginModal = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_LOGIN_MODAL,
            payload: null
        });
    }

    // THIS FUNCTION OPENS REGISTER MODAL
    store.setOpenRegisterModal = function () {
        storeReducer({
            type: GlobalStoreActionType.OPEN_REGISTER_MODAL,
            payload: null
        });
    }

    // THIS FUNCTION CLOSES REGISTER MODAL
    store.setCloseRegisterModal = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_REGISTER_MODAL,
            payload: null
        });
    }

    // THIS FUNCTION SETS SEARCH BAR
    store.setSearchBar = function (search) {
        storeReducer({
            type: GlobalStoreActionType.STORE_SEARCH_BAR,
            payload: search
        });
    }


    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };



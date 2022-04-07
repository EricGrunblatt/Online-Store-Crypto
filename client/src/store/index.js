import { createContext, useState, useContext } from 'react'
import api from '../api';
import AuthContext from '../auth';
import { useHistory } from 'react-router-dom';
/*
    This is our global data store.
    
    @author Eric Grunblatt
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    LOAD_CATALOG_ITEMS: "LOAD_CATALOG_ITEMS",
    OPEN_LOGIN_MODAL: "OPEN_LOGIN_MODAL",
    CLOSE_LOGIN_MODAL: "CLOSE_LOGIN_MODAL",
    OPEN_REGISTER_MODAL: "OPEN_REGISTER_MODAL",
    CLOSE_REGISTER_MODAL: "CLOSE_REGISTER_MODAL",
    MARK_CART_REMOVE: "MARK_CART_REMOVE",
    UNMARK_CART_REMOVE: "MARK_CART_REMOVE",
    MARK_LISTING_DELETION: "MARK_LISTING_DELETION",
    UNMARK_LISTING_DELETION: "UNMARK_LISTING_DELETION",
    GET_ACCOUNT: "GET_ACCOUNT",
    GET_PROFILE: "GET_PROFILE",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        catalogItems: [],
        loginModal: false,
        registerModal: false,
        cartItemRemove: null,
        listingItemDelete: null,
        userAccount: null,
        userProfile: null
    });

    const history = useHistory();
    const { auth } = useContext(AuthContext);

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // GET ALL CATALOG ITEMS
            case GlobalStoreActionType.LOAD_CATALOG_ITEMS: {
                return setStore({
                    catalogItems: payload,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    searchBar: store.searchBar,
                });
            }
            // OPEN LOGIN MODAL
            case GlobalStoreActionType.OPEN_LOGIN_MODAL: {
                return setStore({
                    catalogItems: store.catalogItems,
                    loginModal: true,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: null,
                    searchBar: null,
                });
            }
            // CLOSE LOGIN MODAL
            case GlobalStoreActionType.CLOSE_LOGIN_MODAL: {
                return setStore({
                    catalogItems: store.catalogItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: null,
                    searchBar: null,
                });
            }
            // OPEN REGISTER MODAL
            case GlobalStoreActionType.OPEN_REGISTER_MODAL: {
                return setStore({
                    catalogItems: store.catalogItems,
                    loginModal: false,
                    registerModal: true,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: null,
                    searchBar: null,
                });
            }
            // CLOSE REGISTER MODAL
            case GlobalStoreActionType.CLOSE_REGISTER_MODAL: {
                return setStore({
                    catalogItems: store.catalogItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: null,
                    searchBar: null,
                });
            }
            // MARK CART ITEM TO BE REMOVED
            case GlobalStoreActionType.MARK_CART_REMOVE: {
                return setStore({
                    catalogItems: store.catalogItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: payload,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    searchBar: null,
                });
            }
            // UNMARK CART ITEM TO BE REMOVED
            case GlobalStoreActionType.UNMARK_CART_REMOVE: {
                return setStore({
                    catalogItems: store.catalogItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    searchBar: null,
                });
            }
            // MARK LISTING ITEM TO BE DELETED
            case GlobalStoreActionType.MARK_LISTING_DELETION: {
                return setStore({
                    catalogItems: store.catalogItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: payload,
                    userAccount: null,
                    userProfile: store.userProfile,
                    searchBar: null,
                });
            }
            // UNMARK LISTING ITEM TO BE DELETED
            case GlobalStoreActionType.UNMARK_LISTING_DELETION: {
                return setStore({
                    catalogItems: store.catalogItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    searchBar: null,
                });
            }
            // SET USER ACCOUNT
            case GlobalStoreActionType.GET_ACCOUNT: {
                return setStore({
                    catalogItems: store.catalogItems,
                    loginModal: store.loginModal,
                    registerModal: store.registerModal,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: payload.account,
                    userProfile: payload.profile,
                    searchBar: null,
                });
            }

            // SET USER PROFILE
            case GlobalStoreActionType.GET_PROFILE: {
                return setStore({
                    catalogItems: store.catalogItems,
                    loginModal: store.loginModal,
                    registerModal: store.registerModal,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: store.userAccount,
                    userProfile: payload,
                    searchBar: null,
                });
            }
         
            default:
                return store;
        }
    }

    // LOADS ALL ITEMS IN THE CATALOG AFTER LOGIN/REGISTER
    store.initialLoad = async function () {
        let jsonCatalog = {};
        let response = await api.getCatalog(jsonCatalog);
        if(response.data.status === "OK") {
            storeReducer({
                type: GlobalStoreActionType.LOAD_CATALOG_ITEMS,
                payload: response.data.products
            });
            history.push("/");
        }
    }

    // LOADS ALL ITEMS IN THE CATALOG
    store.loadItems = async function (json) {
        //catalog json
        /* Sort By:
        "DATE_DESCENDING"
        "DATE_ASCENDING"
        "PRICE_ASCENDING"
        "PRICE_DESCENDING"
        */
        let response = await api.getCatalog(json);
        if(response.data.status === "OK") {
            storeReducer({
                type: GlobalStoreActionType.LOAD_CATALOG_ITEMS,
                payload: response.data.products
            });
            console.log("Catalog Items Loaded");
        }
    }

    // SETS ID FOR CART ITEM BEING REMOVED
    store.markCartRemove = async function (id) {
        // Get item from database
        // TODO
        
    }

    // NO CART ITEM WANTING TO BE REMOVED
    store.unmarkCartRemove = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_CART_REMOVE,
            payload: null
        });
    }

    // SETS ID FOR LISTING ITEM BEING DELETED
    store.markListingDelete = async function (id) {
        
    }

    // NO LISTING ITEM WANTING TO BE DELETED
    store.unmarkListingDelete = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LISTING_DELETION,
            payload: null
        });
    }

    // GETS ACCOUNT FROM USER ID
    store.getAccount = async function () {
        let response = await api.getAccount();
        if(response.data.status === "OK") {
            let myAccount = response.data.user;
            async function getProfile() {
                let jsonProfile = {
                    "username": auth.user.username
                }
                response = await api.getProfileByUsername(jsonProfile);
                if(response.data.status === "OK") {
                    let myProfile = response.data;
                    storeReducer({
                        type: GlobalStoreActionType.GET_ACCOUNT,
                        payload: {
                            account: myAccount,
                            profile: myProfile
                        }
                    });
                    history.push("/editprofile");
                }
            }
            getProfile();
        }
        else {
            console.log("API FAILED TO GET ACCOUNT");
        }
    }

    // GETS MY PROFILE FROM USERNAME
    store.getMyProfile = async function (username) {
        let response = await api.getProfileByUsername(username);
        if(response.data.status === "OK") {
            let profile = response.data;
            storeReducer({
                type: GlobalStoreActionType.GET_PROFILE,
                payload: profile
            });
            history.push("/myprofile");
        }
        else {
            console.log("API FAILED TO GET PROFILE");
        }
    
    }

    // GETS PROFILE FROM USERNAME
    store.getProfile = async function (username) {
        let response = await api.getProfileByUsername(username);
        if(response.data.status === "OK") {
            let profile = response.data;
            storeReducer({
                type: GlobalStoreActionType.GET_PROFILE,
                payload: profile
            });
        }
        else {
            console.log("API FAILED TO GET PROFILE");
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



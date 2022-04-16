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
    MARK_BUYER_ADDRESS: "MARK_BUYER_ADDRESS",
    UNMARK_BUYER_ADDRESS: "UNMARK_BUYER_ADDRESS",
    GET_ACCOUNT: "GET_ACCOUNT",
    GET_PROFILE: "GET_PROFILE",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        catalogItems: [],
        newItems: [],
        loginModal: false,
        registerModal: false,
        cartItemRemove: null,
        listingItemDelete: null,
        userAccount: null,
        userProfile: null,
        buyerAddress: null
    });

    const history = useHistory();
    const { auth } = useContext(AuthContext);

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // GET ALL CATALOG ITEMS FOR THE NEWEST ITEMS
            case GlobalStoreActionType.LOAD_NEW_ITEMS: {
                return setStore({
                    catalogItems: payload,
                    newItems: payload,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    buyerAddress: null
                });
            }
            // GET ALL CATALOG ITEMS
            case GlobalStoreActionType.LOAD_CATALOG_ITEMS: {
                return setStore({
                    catalogItems: payload,
                    newItems: store.newItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    buyerAddress: null
                });
            }
            // OPEN LOGIN MODAL
            case GlobalStoreActionType.OPEN_LOGIN_MODAL: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: true,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: null,
                    buyerAddress: null
                });
            }
            // CLOSE LOGIN MODAL
            case GlobalStoreActionType.CLOSE_LOGIN_MODAL: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: null,
                    buyerAddress: null
                });
            }
            // OPEN REGISTER MODAL
            case GlobalStoreActionType.OPEN_REGISTER_MODAL: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: false,
                    registerModal: true,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: null,
                    buyerAddress: null
                });
            }
            // CLOSE REGISTER MODAL
            case GlobalStoreActionType.CLOSE_REGISTER_MODAL: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: null,
                    buyerAddress: null
                });
            }
            // MARK CART ITEM TO BE REMOVED
            case GlobalStoreActionType.MARK_CART_REMOVE: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: payload,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    buyerAddress: null
                });
            }
            // UNMARK CART ITEM TO BE REMOVED
            case GlobalStoreActionType.UNMARK_CART_REMOVE: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    buyerAddress: null
                });
            }
            // MARK LISTING ITEM TO BE DELETED
            case GlobalStoreActionType.MARK_LISTING_DELETION: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: payload,
                    userAccount: null,
                    userProfile: store.userProfile,
                    buyerAddress: null
                });
            }
            // UNMARK LISTING ITEM TO BE DELETED
            case GlobalStoreActionType.UNMARK_LISTING_DELETION: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    buyerAddress: null
                });
            }
            // MARK BUYER ADDRESS
            case GlobalStoreActionType.MARK_BUYER_ADDRESS: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    buyerAddress: payload
                });
            }
            // UNMARK BUYER ADDRESS
            case GlobalStoreActionType.UNMARK_BUYER_ADDRESS: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: false,
                    registerModal: false,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: null,
                    userProfile: store.userProfile,
                    buyerAddress: null
                });
            }
            // SET USER ACCOUNT
            case GlobalStoreActionType.GET_ACCOUNT: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: store.loginModal,
                    registerModal: store.registerModal,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: payload.account,
                    userProfile: payload.profile,
                    buyerAddress: null
                });
            }

            // SET USER PROFILE
            case GlobalStoreActionType.GET_PROFILE: {
                return setStore({
                    catalogItems: store.catalogItems,
                    newItems: store.newItems,
                    loginModal: store.loginModal,
                    registerModal: store.registerModal,
                    cartItemRemove: null,
                    listingItemDelete: null,
                    userAccount: store.userAccount,
                    userProfile: payload,
                    buyerAddress: null
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
                type: GlobalStoreActionType.LOAD_NEW_ITEMS,
                payload: response.data.products
            });
            console.log("Initial Items");
            history.push("/");
        }
    }

    // LOADS ALL ITEMS IN THE CATALOG
    store.loadItems = async function (json) {
        let response = await api.getCatalog(json);
        if(response.data.status === "OK") {
            storeReducer({
                type: GlobalStoreActionType.LOAD_CATALOG_ITEMS,
                payload: response.data.products
            });
            console.log("Catalog Items Loaded");
            history.push("/");
        }
    }

    // STORES REVIEW WRITTEN
    store.writeReview = async function (json) {
        let response = await api.writeReview(json);
        if(response.data.status === "OK") {
            console.log("Review Stored");
            history.push("/orders");
        } else {
            alert(response.data.errorMessage);
        }
    }

    // LOADS PRODUCT PAGE
    store.loadProduct = async function (id) {
        history.push("/product/" + id);
    }

    // SETS ID FOR CART ITEM BEING REMOVED
    store.markCartRemove = async function (id) {
        storeReducer({
            type: GlobalStoreActionType.MARK_CART_REMOVE,
            payload: id
        });
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
        storeReducer({
            type: GlobalStoreActionType.MARK_LISTING_DELETION,
            payload: id
        });
    }

    // NO LISTING ITEM WANTING TO BE DELETED
    store.unmarkListingDelete = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LISTING_DELETION,
            payload: null
        });
    }

    // DELETES LISTING
    store.deleteListing = async function (id) {
        let json = {
            _id: id
        }
        let response = await api.deleteListing(json);
        if(response.data.status === "OK") {
            alert("Listing deleted");
            store.unmarkListingDelete();
            history.push("/listings");
        } else if (response.data.status === "ERROR") {
            alert(response.data.errorMessage);
        }
    }

    // SETS ID FOR BUYER ADDRESS MODAL
    store.markBuyerAddress = async function (id) {
        let json = {
            productId: id
        }
        let response = await api.getShippingInfo(json);
        if(response.data.status === "OK") {
            let user = response.data.user;
            storeReducer({
                type: GlobalStoreActionType.MARK_BUYER_ADDRESS,
                payload: user
            });
        }
    }

    // NO BUYER ADDRESS BEING SHOWN
    store.unmarkBuyerAddress = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_BUYER_ADDRESS,
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
        let json = {
            username: username
        }
        let response = await api.getProfileByUsername(json);
        if(response.data.status === "OK") {
            let profile = response.data;
            storeReducer({
                type: GlobalStoreActionType.GET_PROFILE,
                payload: profile
            });
            history.push("/viewprofile");
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



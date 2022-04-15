import axios from 'axios'

// Send cookie on every request
axios.defaults.withCredentials = true;

// Initialize API
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})


// ALL REQUESTS FOR LOGIN/REGISTER/LOGOUT
export const getLoggedIn = () => api.post('/auth/getLoggedIn');
export const registerUser = (payload) => api.post(`/auth/register`, payload);
export const loginUser = (payload) => api.post(`/auth/login`, payload);
export const logoutUser = () => api.post(`/auth/logout`);

// ALL REQUESTS FOR ACCOUNT
export const getAccount = (payload) => api.post('/user/getAccount', payload);
export const updateAccount = (payload) => api.post('/user/updateAccount', payload);
export const updateProfilePicture = (payload) => api.post('/user/updateProfileImage', payload);
export const getProfileByUsername = (payload) => api.post('/user/getProfileByUsername', payload);

// ALL REQUESTS FOR PRODUCTS
export const getCatalog = (payload) => api.post('/product/getCatalog', payload);
export const addListingProduct = (payload) => api.post('/product/addListingProduct', payload);
export const getProduct = (payload) => api.post('/product/getProduct', payload);
export const updateListingProduct = (payload) => api.post('/product/updateListingProduct', payload);
export const getListingProductsForUser = () => api.post('/product/getListingProductsForUser');
export const getOrderedProductsForUser = () => api.post('/product/getOrderedProductsForUser');
export const writeReview = (payload) => api.post('/user/writeReview', payload);

// ALL REQUESTS FOR WALLET
export const addWallet = (payload) => api.post('/wallet/addWallet', payload);
export const removeWallet = (payload) => api.post('/wallet/removeWallet', payload);



const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    getProduct,
    updateListingProduct,

    getAccount,
    updateAccount,
    updateProfilePicture,
    getProfileByUsername,
    getOrderedProductsForUser,

    getCatalog,
    addListingProduct,
    getListingProductsForUser,
    writeReview,

    addWallet,
    removeWallet
}

export default apis

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

export const addListingProduct = (payload) => api.post('/product/addListingProduct', payload);

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,

    getAccount,
    updateAccount,
    updateProfilePicture,
    getProfileByUsername,

    addListingProduct
}

export default apis

import axios from 'axios'

// Send cookie on every request
axios.defaults.withCredentials = true;

// Initialize API
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})


// ALL REQUESTS FOR LOGIN/REGISTER/LOGOUT
export const getLoggedIn = () => api.post('/auth/getLoggedIn');
export const registerUser = (payload) => api.post(`/auth/register`, payload)
export const loginUser = (payload) => api.post(`/auth/login`, payload)
export const logoutUser = () => api.post(`/auth/logout`);

// ALL REQUESTS FOR PROFILE
export const getProfile = (payload) => api.post('/user/getProfileByUsername', payload);

// ALL REQUESTS FOR CATALOG
export const getCatalog = (payload) => api.post('/product/getCatalog', payload);

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,

    getProfile,    

    getCatalog
}

export default apis

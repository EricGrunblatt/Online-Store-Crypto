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

export const addListingProduct = (payload) => api.post('/product/addListingProduct', payload)

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    addListingProduct
}

export default apis

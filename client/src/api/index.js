import axios from 'axios'

// Send cookie on every request
axios.defaults.withCredentials = true;

// Initialize API
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const registerUser = (payload) => api.post(`/auth/register`, payload)
export const loginUser = (payload) => api.post(`/auth/login`, payload)
export const logoutUser = () => api.get(`/auth/logout`);

const apis = {
    registerUser,
    loginUser,
    logoutUser
}

export default apis

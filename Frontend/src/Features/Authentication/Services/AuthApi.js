import axios from 'axios'

const api = axios.create({
    baseURL: 'https://second-brain-td6n.onrender.com/api/auth',
    withCredentials: true
})

export const registerApi = async ({ username, email, password }) => {
    const response = await api.post(`/register`, { username, email, password });
    return response.data;
}

export const loginAPi = async ({ username, password }) => {
    const response = await api.post(`/login`, { username, password });
    return response.data;
}

export const protectedApi = async ()=>{
    const response = await api.get('/protected');
    return response.data;
}

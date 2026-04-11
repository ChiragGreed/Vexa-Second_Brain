import axios from 'axios'

const api = axios.create({
    baseURL: 'https://second-brain-td6n.onrender.com/api/items',
    withCredentials: true
})


export const getItemsApi = async () => {
    const response = await api.get('/getItems');
    return response.data;
}

export const getSingleItemApi = async (itemId) => {
    const response = await api.get(`/${itemId}`);
    return response.data;
}

export const getRelatedItemApi = async (itemId) => {
    const response = await api.get(`/getRelatedItems/${itemId}`);
    return response.data;
}

export const searchItemsApi = async (Query) => {
    const response = await api.get(`/searchItems?query=${Query}`);
    return response.data;
}

export const resurfacingItemsApi = async () => {
    const response = await api.get(`/resurfacing`);
    return response.data;
}



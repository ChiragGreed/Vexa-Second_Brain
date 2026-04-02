import axios from 'axios'

const api = axios.create({
    baseURL: 'https://second-brain-td6n.onrender.com/api/collections',
    withCredentials: true
})

export const getCollectionsApi = async () => {
    const response = await api.get(`/getCollections`);
    return response.data;
}

export const getCollectionItemsApi = async (collectionId) => {
    const response = await api.get(`/${collectionId}/items`);
    return response.data;

}
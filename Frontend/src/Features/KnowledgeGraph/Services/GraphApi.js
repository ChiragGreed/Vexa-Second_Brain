import axios from 'axios'

const api = axios.create({
    baseURL: 'https://second-brain-td6n.onrender.com/api/knowledgeGraph',
    withCredentials: true
})

export const getGraphApi = async () => {
    const response = await api.get(`/getGraph`);
    return response.data;
}

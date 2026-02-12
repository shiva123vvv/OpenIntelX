import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
});

// Add a request interceptor for logging
api.interceptors.request.use(config => {
    console.log(`[API Client] Request: ${config.method.toUpperCase()} ${config.url}`, config.data || '');
    return config;
}, error => {
    console.error('[API Client] Request Error:', error);
    return Promise.reject(error);
});

// Add a response interceptor for logging
api.interceptors.response.use(response => {
    console.log(`[API Client] Response from ${response.config.url}:`, response.data);
    return response;
}, error => {
    console.error(`[API Client] Response Error from ${error.config?.url}:`, error.response?.data || error.message);
    return Promise.reject(error);
});

export const searchOSINT = async (type, value, consent) => {
    console.log(`[API Client] Initializing OSINT Search - Type: ${type}, Value: ${value}`);

    // Map generic type/value to structured OSINT request
    const payload = {};
    if (type === 'email') payload.email = value;
    else if (type === 'phone') payload.phone = value;
    else if (type === 'username') payload.username = value;
    else if (type === 'name') payload.name = value;

    // Use the deep intelligence module endpoint
    const response = await api.post('/osint/search', payload);

    // Add compatibility layer for searchInfo metadata
    return {
        ...response.data,
        type,
        value
    };
};

export const getSearchHistory = async () => {
    const response = await api.get('/osint/history');
    return response.data;
};

export default api;

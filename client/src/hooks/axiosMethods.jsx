import axios from 'axios';
import toast from 'react-hot-toast';

// main url
const mainUrl = import.meta.env.VITE_BACKEND_URL;
console.log(import.meta.env.VITE_BACKEND_URL)

// get method
export const axiosGET = async (url, setLoad, token) => {
    try {
        setLoad(true);
        console.log(url)
        const response = await axios.get(`${mainUrl}${url}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setLoad(false);
        return response.data.data;
    } catch (error) {
        setLoad(false);
        console.error(`Error in axiosPOST for ${url}:`, error);
        toast.error(`Error in axiosPOST for ${url}:`, error)
        throw error;
    }
}

// post method
export const axiosPOST = async (url, data, setLoad, token) => {
    setLoad(true);
    let response;
    if (token) {
        response = await axios.post(`${mainUrl}${url}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } else {
        response = await axios.post(`${mainUrl}${url}`, data);
    }

    setLoad(false);
    return response.data;
}

// patch method
export const axiosPatch = async (url, data, setLoad, token) => {
    setLoad(true);

    const response = await axios.patch(`${mainUrl}${url}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    setLoad(false);
    return response.data;
}
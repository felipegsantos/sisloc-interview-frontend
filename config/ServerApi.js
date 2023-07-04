import axios from "axios";
import { cookies } from "next/headers";

const serverApi = () => {
    const axiosInstance = axios.create({ baseURL: 'http://localhost:3000/api' });
    const accessToken = cookies().get('sisloc')?.value;
    if(accessToken) {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return axiosInstance;
}

export default serverApi;
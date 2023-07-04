"use client";

import axios from "axios";
import { store } from "../Store";

const clientApi = () => {
    const axiosInstance = axios.create({ baseURL: 'http://localhost:3000/api' });
    const accessToken = store.getState().auth.accessToken;
    if(accessToken) {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return axiosInstance;
}

export const fetcher = (...args) => clientApi()(...args).then(res => res.data);

export default clientApi;
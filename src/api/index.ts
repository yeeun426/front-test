import axios,{ Axios, AxiosRequestConfig } from "axios";
import { APIResponse } from '../interfaces/commonResponse';

// axios 인스턴스  생성
// create 메서드 : header
const Client: Axios = axios.create({
    baseURL: `${process.env.REACT_APP_NAVER_SHOPPING_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': `${process.env.REACT_APP_NAVER_SHOPPING_CLIENT_ID}`,
        'X-Naver-Client-Secret': `${process.env.REACT_APP_NAVER_SHOPPING_CLIENT_SECRET}`
    }
});

export const postChart = async <T>(url: string, params: APIResponse) => {
    try {
        const response = await Client.post<APIResponse>(url,  data, config);
        console.log(response);
        return response;

    } catch (error) {
        console.error(error);
        throw new Error('Failed to create user');
    }
};
import axios, { Axios, AxiosResponse } from 'axios';
import { ShoppingData } from '@interfaces/commonResponse';

// axios 인스턴스 생성
const Client: Axios = axios.create({
  url: `${process.env.REACT_APP_NAVER_SHOPPING_API_URL}`,
  headers: {
    'X-Naver-Client-Id': `${process.env.REACT_APP_NAVER_SHOPPING_CLIENT_ID}`,
    'X-Naver-Client-Secret': `${process.env.REACT_APP_NAVER_SHOPPING_CLIENT_SECRET}`,
    'Content-Type': 'application/json',
  },
});

export const postChart = async <T>(params: ShoppingData): Promise<T | null> => {
  try {
    const url = `${Client.defaults.url}`;
    const { status, data }: AxiosResponse<T> = await Client.post(url, params);
    return status < 500 ? data : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
};

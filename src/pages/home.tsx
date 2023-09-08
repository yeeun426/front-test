import { FC, useState, useEffect, useCallback } from 'react';
import {PageDataInfo, PageDataSubInfo, PageGraphContents} from "./style"
import axios, { AxiosRequestConfig } from "axios";
import { postChart } from '../api/index';
import { ShoppingData, APIResponse } from '../interfaces/commonResponse';
//commonreqeust = apiresponse
// 쇼핑 데이터 리스트
// interface ShoppingData {
//     startData: String;
//     endData: String;
//     timeUnit: "date" | "week" | "month";
//     category: String;
//     keyword: String;
//     device?: "" | "pc"  | "mo";
//     gender?: "" | "m"  | "f";
//     ages?: String[];
// }

const Home: FC = () => {
    const [shoppings,   setShoppings] = useState<ShoppingData | null>(null);

    const handleChart = useCallback(async () => {

        const params: ShoppingData = {
            startDate: "2017-08-01",
            endDate: "2017-09-30",
            timeUnit: "month",
            category: "50000000",
            keyword: "정장",
            device: "",
            gender: "",
            ages: ["10", "20" ]
        }
        const data = await postChart<APIResponse>(params)
      }, [])

    return (
        <>
            <PageDataInfo>
                <div className='items'>
                    <div>시작일자:</div>
                    <input />
                </div>
    
                <div className='items'>
                    <div>종료일자:</div>
                    <input />
                </div>
    
                <div className='items'>
                    <div>카테고리:</div>
                    <input />
                </div>
    
                <div className='items'>
                    <div>키워드:</div>
                    <input />
                </div>
            </PageDataInfo>
            <PageDataSubInfo>
                <select>
                    <option>timeUnit</option>
                    <option>date</option>
                    <option>week</option>
                    <option>month</option>
                </select>    
                <select>
                    <option>age</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                    <option>60</option>
                </select>  
                <select>
                    <option>gender</option>
                    <option>m</option>
                    <option>f</option>
                </select>    
                <select>
                    <option>device</option>
                    <option>설정안함</option>
                    <option>pc</option>
                    <option>mo</option>
                </select>    
                <button onClick={handleChart}>
                    조회
                </button>
            </PageDataSubInfo>
            <PageGraphContents>
    
            </PageGraphContents>
        </>
      );
}

export default Home;
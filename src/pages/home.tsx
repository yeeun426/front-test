import React, { FC, useState, useCallback } from 'react';
import {PageDataInfo, PageDataSubInfo, PageGraphContents} from "./style"
import { postChart } from '../api/index';
import { ShoppingData, APIResponse, Result, DataItem } from '../interfaces/commonResponse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Home: FC = () => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [timeUnit, setTimeUnit] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [device, setDevice] = useState<string>("");
    const [gender, setGender] = useState<string>("");

    const [trend, setTrend] = useState<DataItem[]>([]);

    const ages = [
        { age : "10", title : "10대", color: "red"},
        { age : "20", title : "20대", color: "blue"},
        { age : "30", title : "30대", color: "orange"},
        { age : "40", title : "40대", color: "pink"},
        { age : "50", title : "50대", color: "black"}];

    const [checkAges, setCheckAges] = useState<String[]>([]);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const checkedItemHandler = (value: string, isChecked: boolean) => {
        if (isChecked) {
            setCheckAges((prev) => [...prev, value]);
        } else {
            setCheckAges((prev) => prev.filter((item) => item !== value));
        }
    }

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);
        // console.log(checkAges);
    };

    const handleChart = useCallback(async () => {
        try {
            const params: ShoppingData = {
                startDate: "2020-11-03",
                endDate: "2021-01-23",
                timeUnit: "month",
                category: "50000000",
                keyword: "정장",
                device: "",
                gender: "",
                ages: checkAges
            }
            // const params: ShoppingData = {
            //     startDate: startDate,
            //     endDate: endDate,
            //     timeUnit: timeUnit,
            //     category: category,
            //     keyword: keyword,
            //     device: device,
            //     gender: gender,
            //     ages: checkAges
            // }

            const data = await postChart<APIResponse>(params);
            
            if (data) {
                data.results.forEach((result: Result) => {
                    setTrend(result.data);
                });
                console.log(trend);            
            }
        } catch (error) {
            console.error(error);
        }

    }, [startDate, endDate, timeUnit, category, keyword, device,  gender, checkAges, trend]);

    return (
        <>
            <PageDataInfo>
                <div className='items'>
                    <div>시작일자:</div>
                    <input
                        placeholder="20XX-XX-XX"
                        value= {startDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setStartDate(e.target.value)
                        }}
                    />
                </div>
    
                <div className='items'>
                    <div>종료일자:</div>
                    <input
                        placeholder="20XX-XX-XX"
                        value={endDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEndDate(e.target.value)
                        }}
                    />                
                </div>
                <div className='items'>
                    <div>카테고리:</div>
                    <input
                        value={category}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setCategory(e.target.value)
                        }}
                    />                   
                </div>
    
                <div className='items'>
                    <div>키워드:</div>
                    <input
                        value={keyword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setKeyword(e.target.value)
                        }}
                    />   
                </div>
            </PageDataInfo>
            <PageDataSubInfo>
                <select
                    value={timeUnit}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setTimeUnit(e.target.value);
                    }}
                >
                    <option value = "">timeUnit</option>
                    <option value = "date">date</option>
                    <option value = "week">week</option>
                    <option value = "month">month</option>
                </select>    
                <select
                    value={gender}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setGender(e.target.value);
                    }}
                >                    
                    <option>gender</option>
                    <option value = "m">남성</option>
                    <option value = "f">여성</option>
                </select>    
                <select
                    value={device}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setDevice(e.target.value);
                    }}
                >                      
                    <option value = "">device</option>
                    <option value = "pc">pc</option>
                    <option value = "mo">모바일</option>
                </select>   
                <>
                {ages.map((item) =>  (
                    <label key  =  {item.age}>
                        <input
                            type = "checkbox"
                            id = {item.age}
                            checked={checkAges.includes(item.age)}
                            onChange = {(e) => checkHandler(e, item.age)}            
                        />
                        {item.title}
                    </label>
                ))}
                </>
                <button onClick={handleChart}>
                    조회
                </button>
            </PageDataSubInfo>
            <PageGraphContents>
                <ResponsiveContainer width="100%" aspect = {3/1}>
                    <LineChart data={trend} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" type="category" allowDuplicatedCategory={false} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {checkAges.map((age) => {
                            const ageData = trend.filter((item) => item.group === age);
                            return (
                                <Line
                                    type="monotone"
                                    key={Number(age)}
                                    dataKey="ratio"
                                    name={`${age}대`}
                                    stroke={
                                        ages.find(item => item.age === age)?.color
                                    }
                                    data={ageData}
                                />
                            );
                        })}
                    </LineChart>
                </ResponsiveContainer>
            </PageGraphContents>
        </>
    );
}

export default Home;
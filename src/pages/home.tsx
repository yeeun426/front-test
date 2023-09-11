import React, { FC, useState, useCallback } from 'react';
import {PageDataInfo, PageDataSubInfo, PageGraphContents} from "./style"
import { postChart } from '../api/index';
import { ShoppingData, APIResponse } from '../interfaces/commonResponse';

const Home: FC = () => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [timeUnit, setTimeUnit] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [device, setDevice] = useState<string>("");
    const [gender, setGender] = useState<string>("");

    const ages = [
        { age : "10", title : "10~19세"},
        { age : "20", title : "20~29세"},
        { age : "30", title : "30~39세"},
        { age : "40", title : "40~49세"},
        { age : "50", title : "50~59세"}];

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
    
        console.log(value, e.target.checked);
        debugger
        console.log(checkAges)
    };

    const handleChart = useCallback(async () => {
        try {
            const params: ShoppingData = {
                startDate: startDate,
                endDate: endDate,
                timeUnit: timeUnit,
                category: category,
                keyword: keyword,
                device: device,
                gender: gender,
                ages: checkAges
            }
            const data = await postChart<APIResponse>(params);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }, [startDate, endDate, category, timeUnit, keyword, device,  gender, ages]); // 이 값들이 변경될 때 컴포넌트를 다시 렌더링하도록 의존성을 추가

    return (
        <>
            <PageDataInfo>
                <div className='items'>
                    <div>시작일자:</div>
                    <input
                        placeholder="20XX-XX-XX 형태로 입력해주세요."
                        value= {startDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setStartDate(e.target.value)
                        }}
                    />
                </div>
    
                <div className='items'>
                    <div>종료일자:</div>
                    <input
                        placeholder="20XX-XX-XX 형태로 입력해주세요."
                        value={endDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEndDate(e.target.value)
                        }}
                    />                
                </div>
    
                <div className='items'>
                    <div>카테고리:</div>
                    <input
                        placeholder="20XX-XX-XX 형태로 입력해주세요."
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
    
            </PageGraphContents>
        </>
    );
}

export default Home;
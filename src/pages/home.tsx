import React, { FC, useState, useCallback, useEffect } from 'react';
import {PageDataInfo, PageDataSubInfo, PageGraphContents} from "./style"
import { postChart } from '../api/index';
import { ShoppingData, APIResponse, Result, DataItem } from '../interfaces/commonResponse';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerType } from '../reducers/reducer'; 
import { updateInputValues, requestChart } from '../reducers/action'; 
import {persistor} from "../reducers/store"

// Chart Library(recharts)
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Antd
import {Button,  Space, Select, Input, DatePicker} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

const {Option} = Select;

const Home: FC = () => {
    const dispatch = useDispatch();

    const inputValues = useSelector((state: RootReducerType) => state.inputValues);
    const trend = useSelector((state: RootReducerType) => state.inputValues.trend);

    const [startDate, setStartDate] = useState<string>(inputValues.startDate || '');
    const [endDate, setEndDate] = useState<string>(inputValues.endDate || '');
    const [timeUnit, setTimeUnit] = useState<string>(inputValues.timeUnit || '');
    const [category, setCategory] = useState<string>(inputValues.category || '');
    const [keyword, setKeyword] = useState<string>(inputValues.keyword || '');
    const [device, setDevice] = useState<string>(inputValues.device || '');
    const [gender, setGender] = useState<string>(inputValues.gender || '');

    // const [trend, setTrend] = useState<DataItem[]>([]);

    const ages = [
        { value : "10", label : "10대", color: "red"},
        { value : "20", label : "20대", color: "blue"},
        { value : "30", label : "30대", color: "orange"},
        { value : "40", label : "40대", color: "pink"},
        { value : "50", label : "50대", color: "black"}];

    const [checkAges, setCheckAges] = useState<string[]>(inputValues.ages || []);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 로컬 스토리지에서 저장된 값 복원
        persistor.purge(); // 이 부분을 추가하여 로컬 스토리지를 지우지 않도록 변경
        const savedInputValues = localStorage.getItem('persist:root');
        if (savedInputValues) {
          const parsedInputValues = JSON.parse(savedInputValues);
          dispatch(updateInputValues(parsedInputValues.inputValues));
        }
    }, [dispatch]);

    useEffect(() => {
        // Redux 상태가 변경될 때마다 로컬 스토리지에 저장
        localStorage.setItem('persist:root', JSON.stringify({ inputValues }));
        console.log(localStorage);
    }, [inputValues, dispatch]);
    
    const handleFetchChart = useCallback(async () => {
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
            dispatch(requestChart(params));
            // const data = await postChart<APIResponse>(params);
            // if (data) {
            //     dispatch(handleChart(params));
            //     data.results.map((result: Result) => {
            //         setTrend(result.data);
            //     });
            //     console.log(trend);            
            // }
        } catch (error) {
            console.error(error);
        }

    }, [dispatch]);

    const onDateChange = (
        value: RangePickerProps['value'],
        dateString: [string, string] | string,
      ) => {
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
        dispatch(updateInputValues({ ...inputValues, startDate: dateString[0], endDate: dateString[1] }));
    };

    const handleChange = (value: string[]) => {
        setCheckAges(value);
        dispatch(updateInputValues({ ...inputValues, ages: value }));
        console.log(checkAges)
    };
      
    return (
        <>
            <PageDataInfo>
                <Space.Compact>
                    <Select defaultValue="1"><Option value="1">조회기간</Option></Select>
                    { startDate && endDate ?
                    <DatePicker.RangePicker defaultValue = {[dayjs(startDate), dayjs(endDate)]} onChange = {onDateChange} style={{ width: '100%' }}/>
                    :
                    <DatePicker.RangePicker onChange = {onDateChange} style={{ width: '100%' }}/>
                    }
                </Space.Compact>

                <Space.Compact>
                    <Input
                        addonBefore="카테고리"
                        value={category}
                        placeholder='카테고리를 입력하세요'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setCategory(e.target.value)
                            dispatch(updateInputValues({ ...inputValues, category: e.target.value }));
                        }}
                    />                   
                </Space.Compact>
    
                <Space.Compact>
                    <Input
                        addonBefore="키워드"
                        value={keyword}
                        placeholder='키워드를 입력하세요'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setKeyword(e.target.value)
                            dispatch(updateInputValues({ ...inputValues, keyword: e.target.value }));
                        }}
                    />   
                </Space.Compact>
            </PageDataInfo>

            <PageDataSubInfo>
                <Space.Compact>
                <Select
                    onChange={(value: string) => {
                        setTimeUnit(value);
                        dispatch(updateInputValues({ ...inputValues, timeUnit: value }));
                    }}
                    style={{width : 120}}
                    placeholder  = "구간 단위"
                    value = {timeUnit}
                    options = {[
                        {
                            label: "구간 단위",
                            options: [
                                {value: "date", label:  "date"},
                                {value: "week", label:  "week"},
                                {value: "month", label:  "month"},
                            ],
                        },
                    ]}
                />
                </Space.Compact>
                <Select
                    onChange={(value: string) => {
                        setGender(value);
                        dispatch(updateInputValues({ ...inputValues, gender: value }));
                    }}
                    style={{width : 120}}
                    placeholder = "성별"
                    value = {gender}
                    options = {[
                        {value: "", label: "설정 안 함"},
                        {value: "m",  label: '남성'},
                        {value: "f",  label: '여성'},
                    ]}
                />   
                <Select
                    onChange={(value: string) => {
                        setDevice(value);
                        dispatch(updateInputValues({ ...inputValues, device: value }));
                    }}
                    style={{width: 120}}
                    value = {device}
                    placeholder = "기기"
                    options = {[
                        {value: "", label : "설정 안 함"},
                        {value: "pc", label: "PC"},
                        {value: "mo", label: "모바일"}
                    ]}
                /> 
                <Space style={{ width: '25%' }} direction="vertical">
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="검색 사용자의 연령별 트렌드 조회"
                        onChange = {handleChange}            
                        options={ages}
                        value = {checkAges}
                    />
                </Space>
                <Button type = "primary" onClick={handleFetchChart}>조회</Button>
            </PageDataSubInfo>

            <PageGraphContents>
            {trend?.length ? (
                <ResponsiveContainer width="100%" aspect = {3/1}>
                    <LineChart data={trend} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" allowDuplicatedCategory={false} />
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
                                        ages.find(item => item.value === age)?.color
                                    }
                                    data={ageData}
                                />
                            );
                        })}
                    </LineChart>
                </ResponsiveContainer>
                ) : (
                    <div>no data available</div>
                )}
            </PageGraphContents>
        </>
    );
}

export default Home;
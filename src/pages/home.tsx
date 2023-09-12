import React, { FC, useState, useCallback } from 'react';
import {PageDataInfo, PageDataSubInfo, PageGraphContents} from "./style"
import { postChart } from '../api/index';
import { ShoppingData, APIResponse, Result, DataItem } from '../interfaces/commonResponse';

// Chart Library(recharts)
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Antd
import {Button,  Space, Select, Input, DatePicker} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

const {Option} = Select;

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
        { value : "10", label : "10대", color: "red"},
        { value : "20", label : "20대", color: "blue"},
        { value : "30", label : "30대", color: "orange"},
        { value : "40", label : "40대", color: "pink"},
        { value : "50", label : "50대", color: "black"}];

    const [checkAges, setCheckAges] = useState<String[]>([]);

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

    const onDateChange = (
        value: RangePickerProps['value'],
        dateString: [string, string] | string,
      ) => {
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
    };

    const handleChange = (value: string[]) => {
        setCheckAges(value);
        console.log(checkAges)
    };
      
    return (
        <>
            <PageDataInfo>
                <Space.Compact>
                    <Select defaultValue="1"><Option value="1">조회기간</Option></Select>
                    <DatePicker.RangePicker onChange = {onDateChange} style={{ width: '100%' }} />
                </Space.Compact>

                <Space.Compact>
                    <Input
                        addonBefore="카테고리"
                        value={category}
                        placeholder='카테고리를 입력하세요'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setCategory(e.target.value)
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
                        }}
                    />   
                </Space.Compact>
            </PageDataInfo>


            <PageDataSubInfo>
                <Select
                    onChange={(value: string) => {
                        setTimeUnit(value);
                    }}
                    style={{width : 120}}
                    placeholder  = "구간 단위"
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
                <Select
                    onChange={(value: string) => {
                        setGender(value);
                        console.log(gender);
                    }}
                    style={{width : 120}}
                    placeholder = "성별"
                    options = {[
                        {value: "", label: "설정 안 함"},
                        {value: "m",  label: '남성'},
                        {value: "f",  label: '여성'},
                    ]}
                />   
                <Select
                    onChange={(value: string) => {
                        setDevice(value);
                    }}
                    style={{width: 120}}
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
                    />
                </Space>
                <Button type = "primary" onClick={handleChart}>조회</Button>
            </PageDataSubInfo>

            <PageGraphContents>
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
            </PageGraphContents>
        </>
    );
}

export default Home;
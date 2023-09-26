import React, { FC, useState, useCallback, useEffect } from 'react';
import { ShoppingData } from '@interfaces/commonResponse';
import useDeviceInput from '@hooks/useDeviceInput';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@reducers/reducer';
import { updateInputValues, requestChart } from '@reducers/action';

// Chart Library(recharts)
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Antd
import { Button, Space, Select, Input, DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
import { PageDataInfo, PageDataSubInfo, PageGraphContents } from './style';

const { Option } = Select;

// eslint-disable-next-line react/function-component-definition
const Home: FC = () => {
  const dispatch = useDispatch();

  const inputValues = useSelector((state: RootState) => state.inputValues);
  const trend = useSelector((state: RootState) => state.inputValues.trend);

  const [startDate, setStartDate] = useState<string>(
    inputValues.startDate || '',
  );
  const [endDate, setEndDate] = useState<string>(inputValues.endDate || '');
  // const [timeUnit, setTimeUnit] = useState<string>(inputValues.timeUnit || '');
  // const [category, setCategory] = useState<string>(inputValues.category || '');
  // const [keyword, setKeyword] = useState<string>(inputValues.keyword || '');
  // const [device, setDevice] = useState<string>(inputValues.device || '');
  // const [gender, setGender] = useState<string>(inputValues.gender || '');
  const [age, setAge] = useState<string[]>(inputValues.ages || []);

  // custom hook
  const [keyword, handleKeywordChange] = useDeviceInput(
    'keyword',
    inputValues.keyword || '',
  );
  const [category, handleCategoryChange] = useDeviceInput(
    'category',
    inputValues.category || '',
  );
  const [device, handleDeviceChange] = useDeviceInput(
    'device',
    inputValues.device || '',
  );
  const [gender, handleGenderChange] = useDeviceInput(
    'gender',
    inputValues.gender || '',
  );
  const [timeUnit, handleTimeUnitChange] = useDeviceInput(
    'timeUnit',
    inputValues.timeUnit || '',
  );

  const agelist = [
    { value: '10', label: '10대', color: 'red' },
    { value: '20', label: '20대', color: 'blue' },
    { value: '30', label: '30대', color: 'orange' },
    { value: '40', label: '40대', color: 'pink' },
    { value: '50', label: '50대', color: 'black' },
  ];

  const [checkAges, setCheckAges] = useState<string[]>(inputValues.ages || []);

  useEffect(() => {
    const persistInputValues = localStorage.getItem('persist:root');
    if (persistInputValues && persistInputValues.length < 100) {
      const savedInputValues = JSON.parse(persistInputValues);
      dispatch(updateInputValues(savedInputValues.inputValues));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('persist:root', JSON.stringify({ inputValues }));
  }, [inputValues, dispatch]);

  const handleChart = useCallback(async () => {
    try {
      setAge(checkAges);

      const params: ShoppingData = {
        startDate,
        endDate,
        timeUnit,
        category,
        keyword,
        device,
        gender,
        ages: checkAges,
      };
      dispatch(requestChart(params));
    } catch (error) {
      console.error(error);
    }
  }, [
    category,
    checkAges,
    device,
    dispatch,
    endDate,
    gender,
    keyword,
    startDate,
    timeUnit,
  ]);

  const onDateChange = (
    value: RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
    dispatch(
      updateInputValues({
        ...inputValues,
        startDate: dateString[0],
        endDate: dateString[1],
      }),
    );
  };

  const handleAgesChange = (value: string[]) => {
    setCheckAges(value);
    dispatch(updateInputValues({ ...inputValues, ages: value }));
  };

  return (
    <>
      <PageDataInfo>
        <Space.Compact>
          <Select defaultValue="1">
            <Option value="1">조회기간</Option>
          </Select>
          {startDate && endDate ? (
            <DatePicker.RangePicker
              defaultValue={[dayjs(startDate), dayjs(endDate)]}
              onChange={onDateChange}
              style={{ width: '100%' }}
            />
          ) : (
            <DatePicker.RangePicker
              onChange={onDateChange}
              style={{ width: '100%' }}
            />
          )}
        </Space.Compact>

        <Space.Compact>
          <Input
            addonBefore="카테고리"
            value={category}
            placeholder="카테고리를 입력하세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleCategoryChange(e.target.value)
            }
          />
        </Space.Compact>

        <Space.Compact>
          <Input
            addonBefore="키워드"
            value={keyword}
            placeholder="키워드를 입력하세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleKeywordChange(e.target.value)
            }
          />
        </Space.Compact>
      </PageDataInfo>

      <PageDataSubInfo>
        <Space.Compact>
          <Select
            onChange={handleTimeUnitChange}
            style={{ width: 120 }}
            placeholder="구간 단위"
            value={timeUnit}
            options={[
              {
                label: '구간 단위',
                options: [
                  { value: 'date', label: 'date' },
                  { value: 'week', label: 'week' },
                  { value: 'month', label: 'month' },
                ],
              },
            ]}
          />
        </Space.Compact>
        <Select
          onChange={handleGenderChange}
          style={{ width: 120 }}
          placeholder="성별"
          value={gender}
          options={[
            { value: '', label: '설정 안 함' },
            { value: 'm', label: '남성' },
            { value: 'f', label: '여성' },
          ]}
        />
        <Select
          onChange={handleDeviceChange}
          style={{ width: 120 }}
          value={device}
          placeholder="기기"
          options={[
            { value: '', label: '설정 안 함' },
            { value: 'pc', label: 'PC' },
            { value: 'mo', label: '모바일' },
          ]}
        />
        <Space style={{ width: '25%' }} direction="vertical">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="사용자의 연령별 트렌드 조회"
            onChange={handleAgesChange}
            options={agelist}
            value={checkAges}
          />
        </Space>
        <Button type="primary" onClick={handleChart}>
          조회
        </Button>
      </PageDataSubInfo>

      <PageGraphContents>
        {trend?.length > 0 && (
          <ResponsiveContainer width="100%" aspect={3 / 1}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" allowDuplicatedCategory={false} />
              <YAxis />
              <Tooltip />
              <Legend />
              {age.map((ageItem) => {
                const ageData = trend.filter(
                  (item: any) => item.group === ageItem,
                );
                return (
                  <Line
                    type="monotone"
                    key={Number(ageItem)}
                    dataKey="ratio"
                    name={`${ageItem}대`}
                    stroke={
                      agelist.find((item) => item.value === ageItem)?.color
                    }
                    data={ageData}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        )}
      </PageGraphContents>
    </>
  );
};

export default Home;

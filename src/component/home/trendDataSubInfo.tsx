import React, { FC, useState, useCallback, useEffect } from "react";
import { ShoppingData } from "@interfaces/commonResponse";

import { PageDataSubInfo } from "@pages/style";
import useDeviceInput from "@hooks/useDeviceInput";
import { allCategory, agelist } from "@assets/constant/categoryLable";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reducers/reducer";
import { updateInputValues, requestChart } from "@reducers/action";

// Antd
import { Button, Space, Select } from "antd";

const TrendDataSubInfo: FC = () => {
  const dispatch = useDispatch();

  const inputValues = useSelector((state: RootState) => state.inputValues);

  const startDate = inputValues.startDate || "";
  const endDate = inputValues.endDate || "";
  const category = inputValues.category || "";
  const keyword = inputValues.keyword || "";

  const [checkAges, setCheckAges] = useState<string[]>(inputValues.ages || []);

  // custom hook
  const [device, handleDeviceChange] = useDeviceInput(
    "device",
    inputValues.device || ""
  );
  const [gender, handleGenderChange] = useDeviceInput(
    "gender",
    inputValues.gender || ""
  );
  const [timeUnit, handleTimeUnitChange] = useDeviceInput(
    "timeUnit",
    inputValues.timeUnit || ""
  );

  const handleAgesChange = (value: string[]) => {
    setCheckAges(value);
  };

  useEffect(() => {
    const persistInputValues = localStorage.getItem("persist:root");
    if (persistInputValues && persistInputValues.length < 100) {
      const savedInputValues = JSON.parse(persistInputValues);
      dispatch(updateInputValues(savedInputValues.inputValues));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("persist:root", JSON.stringify({ inputValues }));
  }, [inputValues]);

  const handleChart = useCallback(async () => {
    try {
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
      dispatch(updateInputValues({ ...inputValues, ages: checkAges }));
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
    inputValues,
    keyword,
    startDate,
    timeUnit,
  ]);

  return (
    <PageDataSubInfo>
      <Space.Compact>
        <Select
          onChange={handleTimeUnitChange}
          style={{ width: 120 }}
          placeholder={allCategory["timeUnit"].label}
          value={timeUnit}
          options={allCategory["timeUnit"].options}
        />
      </Space.Compact>
      <Select
        onChange={handleGenderChange}
        style={{ width: 120 }}
        placeholder={allCategory["gender"].label}
        value={gender}
        options={allCategory["gender"].options}
      />
      <Select
        onChange={handleDeviceChange}
        style={{ width: 120 }}
        value={device}
        placeholder={allCategory["device"].label}
        options={allCategory["device"].options}
      />
      <Space style={{ width: "25%" }} direction="vertical">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
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
  );
};

export default TrendDataSubInfo;

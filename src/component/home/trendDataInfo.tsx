import React, { FC, useState } from "react";
import { PageDataInfo } from "@pages/style";
import useDeviceInput from "@hooks/useDeviceInput";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reducers/reducer";
import { updateInputValues } from "@reducers/action";

// Antd
import { Space, Select, Input, DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

const { Option } = Select;

const TrendDataInfo: FC = () => {
  const dispatch = useDispatch();

  const inputValues = useSelector((state: RootState) => state.inputValues);

  const [startDate, setStartDate] = useState<string>(
    inputValues.startDate || ""
  );
  const [endDate, setEndDate] = useState<string>(inputValues.endDate || "");

  //custom hook
  const [category, handleCategoryChange] = useDeviceInput(
    "category",
    inputValues.category || ""
  );
  const [keyword, handleKeywordChange] = useDeviceInput(
    "keyword",
    inputValues.keyword || ""
  );

  const onDateChange = (
    value: RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
    dispatch(
      updateInputValues({
        ...inputValues,
        startDate: dateString[0],
        endDate: dateString[1],
      })
    );
  };

  return (
    <PageDataInfo>
      <Space.Compact>
        <Select defaultValue="1">
          <Option value="1">조회기간</Option>
        </Select>
        {startDate && endDate ? (
          <DatePicker.RangePicker
            defaultValue={[dayjs(startDate), dayjs(endDate)]}
            onChange={onDateChange}
            style={{ width: "100%" }}
          />
        ) : (
          <DatePicker.RangePicker
            onChange={onDateChange}
            style={{ width: "100%" }}
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
  );
};

export default TrendDataInfo;

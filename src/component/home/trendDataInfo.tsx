import React, { FC } from "react";
import { PageDataInfo } from "@pages/style";
import { useTrendDataInfo } from "@hooks/useTrendDataInfo";

// Antd
import { Space, Select, Input, DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const TrendDataInfo: FC = () => {
  const {
    startDate,
    endDate,
    onDateChange,
    category,
    handleCategoryChange,
    keyword,
    handleKeywordChange,
  } = useTrendDataInfo();

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

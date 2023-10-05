import { FC } from "react";
import { useTrendDataSubInfo } from "@hooks/useTrendDataSubInfo";
import { PageDataSubInfo } from "@pages/style";
import { allCategory, agelist } from "@assets/constant/categoryLable";

// Antd
import { Button, Space, Select } from "antd";

const TrendDataSubInfo: FC = () => {
  const {
    timeUnit,
    gender,
    device,
    checkAges,
    handleTimeUnitChange,
    handleGenderChange,
    handleDeviceChange,
    handleAgesChange,
    handleChart,
  } = useTrendDataSubInfo();

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

import React, { FC } from "react";
import { PageGraphContents } from "@pages/style";
import { agelist } from "@assets/constant/categoryLable";

import { useSelector } from "react-redux";
import { RootState } from "@reducers/reducer";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TrendGraphCharts: FC = () => {
  const trend = useSelector((state: RootState) => state.inputValues.trend);
  const inputValues = useSelector((state: RootState) => state.inputValues);
  const age = inputValues.ages || [];

  return (
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
                (item: any) => item.group === ageItem
              );
              return (
                <Line
                  type="monotone"
                  key={Number(ageItem)}
                  dataKey="ratio"
                  name={`${ageItem}대`}
                  stroke={agelist.find((item) => item.value === ageItem)?.color}
                  data={ageData}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      )}
    </PageGraphContents>
  );
};

export default TrendGraphCharts;

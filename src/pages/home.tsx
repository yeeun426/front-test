import React, { FC } from "react";
import TrendGraphCharts from "@component/home/trendGraphCharts";
import TrendDataInfo from "@component/home/trendDataInfo";
import TrendDataSubInfo from "@component/home/trendDataSubInfo";

const Home: FC = () => {
  return (
    <>
      <TrendDataInfo />
      <TrendDataSubInfo />
      <TrendGraphCharts />
    </>
  );
};

export default Home;

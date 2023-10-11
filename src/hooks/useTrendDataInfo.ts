import { useState } from "react";
import useDeviceInput from "@hooks/useDeviceInput";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reducers/reducer";
import { updateInputValues } from "@reducers/action";

import type { RangePickerProps } from "antd/es/date-picker";

export const useTrendDataInfo = () => {
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

  return {
    startDate,
    endDate,
    onDateChange,
    category,
    handleCategoryChange,
    keyword,
    handleKeywordChange,
  };
};

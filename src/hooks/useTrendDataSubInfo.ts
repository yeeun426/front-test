import { useState, useCallback, useEffect } from "react";
import { ShoppingData } from "@interfaces/commonResponse";

import useDeviceInput from "@hooks/useDeviceInput";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reducers/reducer";
import { updateInputValues, requestChart } from "@reducers/action";

export const useTrendDataSubInfo = () => {
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

  return {
    handleTimeUnitChange,
    timeUnit,
    handleGenderChange,
    gender,
    handleDeviceChange,
    device,
    handleAgesChange,
    checkAges,
    handleChart,
  };
};

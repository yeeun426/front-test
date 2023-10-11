import React, { useState, useCallback } from "react";
import { updateInputValues } from "@reducers/action";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reducers/reducer"; // eslint-disable-line no-unused-vars

function useDeviceInput(
  category: string,
  initialValue: string
): [string, (value: string) => void] {
  const [shoppingValue, setShoppingValue] = useState<string>(initialValue);

  const dispatch = useDispatch();
  const inputValues = useSelector((state: RootState) => state.inputValues);

  const handleDeviceChange = useCallback(
    (value: string | React.ChangeEvent<HTMLInputElement>) => {
      if (typeof value === "string") {
        console.log(value);
        setShoppingValue(value);
        dispatch(updateInputValues({ ...inputValues, [category]: value }));
      }
    },
    [dispatch, inputValues, category]
  );

  return [shoppingValue, handleDeviceChange];
}

export default useDeviceInput;

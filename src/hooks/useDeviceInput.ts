import React, { useState, useCallback, useMemo } from "react";
import { updateInputValues } from "@reducers/action";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reducers/reducer"; // eslint-disable-line no-unused-vars
import { debounce } from "lodash";

function useDeviceInput(
  category: string,
  initialValue: string
): [string, (value: string) => void] {
  const [shoppingValue, setShoppingValue] = useState<string>(initialValue);

  const dispatch = useDispatch();
  const inputValues = useSelector((state: RootState) => state.inputValues);

  const handleDelayChange = useMemo(
    () =>
      debounce((value: string | React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateInputValues({ ...inputValues, [category]: value }));
        console.log(value);
      }, 300),
    [category, dispatch, inputValues]
  );

  const handleDeviceChange = useCallback(
    (value: string | React.ChangeEvent<HTMLInputElement>) => {
      if (typeof value === "string") {
        setShoppingValue(value);
        handleDelayChange(value);
      }
    },
    [handleDelayChange]
  );

  return [shoppingValue, handleDeviceChange];
}

export default useDeviceInput;

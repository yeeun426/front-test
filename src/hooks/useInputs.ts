import { useState, useCallback } from 'react';
import { updateInputValues } from '@reducers/action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@reducers/reducer';

function useDeviceInput(
  initialValue: string,
): [string, (value: string) => void] {
  const [device, setDevice] = useState<string>(initialValue);
  const dispatch = useDispatch();
  const inputValues = useSelector((state: RootState) => state.inputValues);

  const handleDeviceChange = useCallback(
    (value: string) => {
      setDevice(value);
      dispatch(updateInputValues({ ...inputValues, device: value }));
      console.log(dispatch);
    },
    [dispatch, updateInputValues, inputValues],
  );

  return [device, handleDeviceChange];
}

export default useDeviceInput;

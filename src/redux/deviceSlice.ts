import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
  isMobile: boolean;
  isTablet: boolean;
  width: number;
}

const initialState: DeviceState = {
  isMobile: false,
  isTablet: false,
  width: 0,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceState(state, action: PayloadAction<Partial<DeviceState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setDeviceState } = deviceSlice.actions;
export default deviceSlice.reducer; 
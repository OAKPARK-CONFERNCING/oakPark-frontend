import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userReducer from './userSlice';
import sessionsReducer from './sessionsSlice';
import meetingsReducer from './meetingsSlice';
import uiReducer from './uiSlice';
import videoReducer from './videoSlice';
import toastReducer from './toastSlice';
import deviceReducer from './deviceSlice';
import { clickOutsideMiddleware } from './middleware/clickOutsideMiddleware';

export const store = configureStore({
  reducer: {
    user: userReducer,
    sessions: sessionsReducer,
    meetings: meetingsReducer,
    ui: uiReducer,
    video: videoReducer,
    toast: toastReducer,
    device: deviceReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(clickOutsideMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
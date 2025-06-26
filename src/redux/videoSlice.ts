import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Participant {
  id: string | number;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface VideoState {
  participants: Participant[];
  activeParticipant: Participant | null;
  isMicOn: boolean;
  isVideoOn: boolean;
  isShareScreen: boolean;
  isSidebarOpen: boolean;
  meetingTime: number;
}

const initialState: VideoState = {
  participants: [],
  activeParticipant: null,
  isMicOn: true,
  isVideoOn: true,
  isShareScreen: true,
  isSidebarOpen: false,
  meetingTime: 0,
};

export const fetchParticipants = createAsyncThunk('video/fetchParticipants', async (_, thunkAPI) => {
  // Placeholder for API call
  return [] as Participant[];
});

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setActiveParticipant(state, action: PayloadAction<Participant | null>) {
      state.activeParticipant = action.payload;
    },
    setMicOn(state, action: PayloadAction<boolean>) {
      state.isMicOn = action.payload;
    },
    setVideoOn(state, action: PayloadAction<boolean>) {
      state.isVideoOn = action.payload;
    },
    setShareScreen(state, action: PayloadAction<boolean>) {
      state.isShareScreen = action.payload;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
    setMeetingTime(state, action: PayloadAction<number>) {
      state.meetingTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchParticipants.fulfilled, (state, action: PayloadAction<Participant[]>) => {
      state.participants = action.payload;
    });
  },
});

export const { setActiveParticipant, setMicOn, setVideoOn, setShareScreen, setSidebarOpen, setMeetingTime } = videoSlice.actions;
export default videoSlice.reducer; 
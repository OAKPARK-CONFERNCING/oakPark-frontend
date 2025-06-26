import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Meeting {
  id: string | number;
  title: string;
  status: string;
  participants: any[];
  [key: string]: any;
}

interface MeetingsState {
  meetings: Meeting[];
  loading: boolean;
  error: string | null;
  filter: string;
}

const initialState: MeetingsState = {
  meetings: [],
  loading: false,
  error: null,
  filter: 'all',
};

export const fetchMeetings = createAsyncThunk('meetings/fetchMeetings', async (_, thunkAPI) => {
  // Placeholder for API call
  return [] as Meeting[];
});

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeetings.fulfilled, (state, action: PayloadAction<Meeting[]>) => {
        state.loading = false;
        state.meetings = action.payload;
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch meetings';
      });
  },
});

export const { setFilter } = meetingsSlice.actions;
export default meetingsSlice.reducer; 
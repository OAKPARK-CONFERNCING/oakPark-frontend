import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Session {
  id: string | number;
  title: string;
  topimg: string;
  category: string;
  progress: number;
  timeRemaining: string;
  instructor: {
    name: string;
    email: string;
    avatar: string;
  };
}

interface SessionsState {
  sessions: Session[];
  loading: boolean;
  error: string | null;
}

const initialState: SessionsState = {
  sessions: [],
  loading: false,
  error: null,
};

export const fetchSessions = createAsyncThunk('sessions/fetchSessions', async (_, thunkAPI) => {
  // Placeholder for API call
  return [] as Session[];
});

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action: PayloadAction<Session[]>) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch sessions';
      });
  },
});

export default sessionsSlice.reducer; 
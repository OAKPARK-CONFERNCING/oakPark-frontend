import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define user type
interface User {
  name: string;
  email: string;
  avatar: string;
  role?: string;
  joinDate?: string;
  additionalInfo?: Record<string, string>;
}

// Initial state
interface UserState {
  currentUser: {
    name: string;
    email: string;
    avatar: string;
    role?: string;
    joinDate?: string;
    additionalInfo?: {
      [key: string]: string;
    };
  };
  isProfileCardVisible: boolean;
}

const initialState: UserState = {
  currentUser: {
    name: "Emmanuel A.",
    email: "emmanuel@example.com",
    avatar: "https://picsum.photos/300/200", // Using the avatar from sidebar
    role: "Admin",
    joinDate: "June 2023",
    additionalInfo: {
      "Total Sessions": "24",
      "Time Spent": "20 hours"
    }
  },
  isProfileCardVisible: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleProfileCard: (state) => {
      state.isProfileCardVisible = !state.isProfileCardVisible;
    },
    hideProfileCard: (state) => {
      state.isProfileCardVisible = false;
    },
    updateUser: (state, action: PayloadAction<Partial<UserState['currentUser']>>) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    }
  }
});

export const { toggleProfileCard, hideProfileCard, updateUser } = userSlice.actions;

export default userSlice.reducer;
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
    firstName: string;
    lastName: string;
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
    firstName: "Emmanuel A.",
    lastName: "Doe",
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
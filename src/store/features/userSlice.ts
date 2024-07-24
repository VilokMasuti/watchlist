import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
}

const initialState: UserState = {
  email: localStorage.getItem('email') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      localStorage.setItem('email', action.payload);
    },
    clearUser: (state) => {
      state.email = null;
      localStorage.removeItem('email');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

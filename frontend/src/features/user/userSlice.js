import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setError } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserError = (state) => state.user.error; // Export selectUserError selector

export default userSlice.reducer;

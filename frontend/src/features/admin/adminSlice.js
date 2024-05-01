import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: null,
  isAuthenticated: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      
console.log(state.admin)
    },
    clearAdmin(state) {
      state.admin = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  
});

export const { setAdmin, clearAdmin, setError } = adminSlice.actions;

export const selectAdmin = (state) => state.admin;
export const selectIsAdminAuthenticated = (state) => state.admin.isAuthenticated;
export const selectAdminError = (state) => state.admin.error;

export default adminSlice.reducer;

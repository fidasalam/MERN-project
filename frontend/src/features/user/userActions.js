import { setUser, clearUser, setError } from './userSlice';
import axios from 'axios';

export const login = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', userData);
    const { token } = response.data;

    localStorage.setItem('token', token);
    console.log('Login successful');

    dispatch(setUser(userData)); 
    return true; 
  } catch (error) {
    console.error('Error in login:', error);
    if (error.response && error.response.data && error.response.data.message) {
      dispatch(setError(error.response.data.message));
    } else {
      dispatch(setError('An unexpected error occurred'));
    }
    return false; 
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(clearUser());
};

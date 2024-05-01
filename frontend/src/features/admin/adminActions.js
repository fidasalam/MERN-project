import { setAdmin, setError,clearAdmin } from '../../features/admin/adminSlice';
import axios from 'axios';

export const adminLogin = (adminData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/admin/adminlogin', adminData);
    const { token } = response.data;

    localStorage.setItem('adminToken', token);
    console.log('Admin login successful');

    dispatch(setAdmin(adminData));
    navigate('/admin/userlist');
  } catch (error) {
    console.error('Error in admin login:', error);
    if (error.response && error.response.data && error.response.data.error) {
      dispatch(setError(error.response.data.error));
    } else {
      dispatch(setError('An unexpected error occurred'));
    }
  }
};

export const adminLogout = () => async (dispatch) => {
  try {
    localStorage.removeItem('adminToken');
    dispatch(clearAdmin());
    console.log('Admin logout successful');
  } catch (error) {
    console.error('Error in admin logout:', error);
    dispatch(setError('An unexpected error occurred'));
  }
};

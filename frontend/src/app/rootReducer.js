import { combineReducers } from 'redux';
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/adminSlice';

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer
});

export default rootReducer;

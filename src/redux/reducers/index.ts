import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../authSlice';
import postReducer from '../postSlice';
import profileReadinessTestReducer from '../readinessTestSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  profileReadinessTest: profileReadinessTestReducer,
});

export default rootReducer;

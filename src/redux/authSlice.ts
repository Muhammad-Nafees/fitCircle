import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAuth, userRole} from '../interfaces/auth.interface';

const initialState: IAuth = {
  isAuthenticated: false,
  userRole: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setuserRole: (state, action: PayloadAction<userRole>) => {
      state.userRole = action.payload;
    },
    authenticate: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.userRole = null;
    },
  },
});

export const {setuserRole, authenticate, logout} = authSlice.actions;

export default authSlice.reducer;

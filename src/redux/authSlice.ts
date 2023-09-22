import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountType, IAuth, IUserRole} from '../interfaces/auth.interface';
import {IUser} from '../interfaces/user.interface';
import {useSelector} from 'react-redux';
import {RootState} from './store';

const initialState: IAuth = {
  isAuthenticated: false,
  accountType: null,
  userRole: undefined,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setuserRole: (state, action: PayloadAction<IUserRole>) => {
      state.userRole = action.payload;
    },
    setAccountType: (state, action: PayloadAction<IAccountType>) => {
      state.accountType = action.payload;
    },
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.userRole = undefined;
    },
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const {
  setuserRole,
  setAccountType,
  setUserData,
  setAccessToken,
  setRefreshToken,
  authenticate,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

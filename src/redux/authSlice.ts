import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountType, IAuth, IUserRole} from '../interfaces/auth.interface';
import {IUser} from '../interfaces/user.interface';

const initialState: IAuth = {
  isAuthenticated: false,
  accessToken: null,
  accountType: null,
  userRole: undefined,
  user: null,
  authorizationToken: ''
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
    authenticate: state => {
      state.isAuthenticated = true;
    },
    setaccessToken: (state, action) => {
      state.user = action.payload;
    },
    setAuthorizationToken: (state, action) => {
      state.authorizationToken = action.payload;
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

export const {setuserRole,setaccessToken, setAccountType, setUserData, authenticate, logout,setAuthorizationToken} =
  authSlice.actions;

export default authSlice.reducer;

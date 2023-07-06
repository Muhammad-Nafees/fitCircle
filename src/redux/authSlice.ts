import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountType, IAuth, IUserRole} from '../interfaces/auth.interface';
import {IUser} from '../interfaces/user.interface';

const initialState: IAuth = {
  isAuthenticated: false,
  refreshToken: null,
  accountType: null,
  userRole: undefined,
  user: null,
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
    setRefreshToken: (state, action) => {
      state.user = action.payload;
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

export const {setuserRole,setRefreshToken, setAccountType, setUserData, authenticate, logout} =
  authSlice.actions;

export default authSlice.reducer;

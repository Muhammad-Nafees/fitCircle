import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAccountType, IAuth, IUserRole} from '../interfaces/auth.interface';
import {IPhysicalActivity, IUser} from '../interfaces/user.interface';

export interface IphysicalReadiness {
  data: IPhysicalActivity | null;
}

const initialState: IphysicalReadiness = {
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhysicalReadiness: (state, action: PayloadAction<IPhysicalActivity>) => {
      state.data = action.payload;
    },
  },
});

export const {setPhysicalReadiness} = authSlice.actions;

export default authSlice.reducer;

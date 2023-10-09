import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../interfaces/user.interface';

interface IProfile {
  followersList: IUser[] | null;
  followingsList: IUser[] | null;
  communitiesList: any[] | null;
}

const initialState: IProfile = {
  followersList: [],
  followingsList: [],
  communitiesList: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setFollowersList: (state, action: PayloadAction<IUser[]>) => {
      state.followersList = action.payload;
    },
    setFollowingsList: (state, action: PayloadAction<IUser[]>) => {
      state.followingsList = action.payload;
    },
    setCommunitiesList: (state, action: PayloadAction<any[]>) => {
      state.communitiesList = action.payload;
    },
    removeFollower: (state, action: PayloadAction<string>) => {
      const followerIdToDelete = action.payload;
      if (state.followersList) {
        state.followersList = state.followersList.filter(
          (follower: IUser) => follower._id !== followerIdToDelete,
        );
      }
    },
    unFollowUser: (state, action: PayloadAction<string>) => {
      const followingIdToDelete = action.payload;
      if (state.followingsList) {
        state.followingsList = state.followingsList.filter(
          following => following._id !== followingIdToDelete,
        );
      }
    },
    deleteCommunity: (state, action: PayloadAction<string>) => {
      const communityIdToDelete = action.payload;
      if (state.communitiesList) {
        state.communitiesList = state.communitiesList.filter(
          community => community._id !== communityIdToDelete,
        );
      }
    },
  },
});

export const {
  setFollowersList,
  setFollowingsList,
  setCommunitiesList,
  removeFollower,
  unFollowUser,
  deleteCommunity,
} = profileSlice.actions;

export default profileSlice.reducer;

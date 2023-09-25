import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPost, IUser} from '../interfaces/user.interface';
import {IPagination} from 'interfaces/pagination.interface';

export interface IMyCirclePosts {
  user: IUser;
  posts: IPost;
}

interface IPostState {
  posts: IMyCirclePosts[] | null;
  pagination: IPagination | null;
  selectedPost: any | null;
}

const initialState: IPostState = {
  posts: null,
  pagination: null,
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setAllPosts: (state, action: PayloadAction<IMyCirclePosts[]>) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<any>) => {
      state.selectedPost = action.payload;
    },
    setPagination: (state, action: PayloadAction<IPagination>) => {
      state.pagination = action.payload;
    },
  },
});

export const {setAllPosts, setPagination, setSelectedPost} = postSlice.actions;

export default postSlice.reducer;

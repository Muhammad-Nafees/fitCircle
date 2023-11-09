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
  commentsCount: number | any;
  editPost: IPost | null;
}

const initialState: IPostState = {
  posts: null,
  pagination: null,
  selectedPost: null,
  commentsCount: null,
  editPost: null,
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
    setCommentCount: (state, action: PayloadAction<any>) => {
      state.commentsCount = action.payload;
    },
    setEditPost: (state, action: PayloadAction<IPost | null>) => {
      state.editPost = action.payload;
    },
  },
});

export const {setAllPosts, setPagination, setSelectedPost, setCommentCount,setEditPost} =
  postSlice.actions;

export default postSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPost} from '../interfaces/user.interface';

interface IPostState {
  posts: IPost[];
  isLoading: boolean;
  error: string | null;
  selectedPost: [] | null;
}

const initialState: IPostState = {
  posts: [],
  isLoading: false,
  error: null,
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPostsStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action: PayloadAction<IPost[]>) => {
      state.isLoading = false;
      const existingPostIds = new Set(state.posts.map(post => post._id));
      const newPosts = action.payload.filter(
        post => !existingPostIds.has(post._id),
      );
      state.posts = [...state.posts, ...newPosts];
      state.error = null;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  setSelectedPost,
} = postSlice.actions;

export default postSlice.reducer;

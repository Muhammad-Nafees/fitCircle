import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProfileReadinessTestState {
  answers: string[];
}

const initialState: IProfileReadinessTestState = {
  answers: [],
};

const profileReadinessTestSlice = createSlice({
  name: 'profileReadinessTest',
  initialState,
  reducers: {
    setAnswers: (state, action: PayloadAction<string[]>) => {
      state.answers = action.payload;
    },
  },
});

export const { setAnswers } = profileReadinessTestSlice.actions;

export default profileReadinessTestSlice.reducer;

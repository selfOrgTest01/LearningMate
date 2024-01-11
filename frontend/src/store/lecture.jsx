import { createSlice } from '@reduxjs/toolkit';

const initialLectureState = {
  term: '',
  courses: [],
};

const lectureSlice = createSlice({
  name: 'lecture',
  initialState: initialLectureState,
  reducers: {
    insert(state, action) {
      state.term = action.payload.term;
      state.courses = action.payload.courses;
    },
  },
});

export const lectureAction = lectureSlice.actions;
export default lectureSlice.reducer;
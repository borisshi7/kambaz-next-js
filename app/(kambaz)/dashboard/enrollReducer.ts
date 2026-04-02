import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: [],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: { user, course } }) => {
      const newEnrollment: any = { _id: uuidv4(), user, course };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenroll: (state, { payload: { user, course } }) => {
      state.enrollments = state.enrollments.filter(
        (m: any) => !(m.user === user && m.course === course),
      );
    },
	setEnroll: (state, action) => {
		state.enrollments = action.payload;
	}
  },
});

export const { enroll, unenroll, setEnroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courses/[cid]/reducer";
import sidebarReducer from "./courses/[cid]/sidebarReducer";
import moduleReducer from "./courses/[cid]/modules/reducer";
import accountReducer from "./account/reducer";
import assignmentReducer from "./courses/[cid]/assignments/reducer";
import enrollReducer from "./dashboard/enrollReducer";
import quizReducer from "./courses/[cid]/quizzes/reducer";

const store = configureStore({
  reducer: {
    coursesReducer,
    sidebarReducer,
    moduleReducer,
    accountReducer,
    assignmentReducer,
    enrollReducer,
    quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

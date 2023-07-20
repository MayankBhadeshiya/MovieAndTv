import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userslice';

const store = configureStore({
  reducer: {
    userReducer,
  },
});

export default store;
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    userData: [],
  },
  reducers: {
    user: (state, actions) => {
      state.userData = actions.payload;
    },
  },
});

export const { user } = counterSlice.actions;
export const selectUser = (state) => state.counter.userData;

export default counterSlice.reducer;

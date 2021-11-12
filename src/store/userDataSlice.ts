import { createSlice } from "@reduxjs/toolkit";

export interface IuserData {
  userName: string | null;
  uid: string | null;
  isAuthenticated: boolean;
  userEmail: string | null;
}

const initState: IuserData = {
  userName: null,
  uid: null,
  isAuthenticated: false,
  userEmail: null,
};
const userDataSlice = createSlice({
  name: "userData",
  initialState: initState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.uid = action.payload.uid;
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName;

      //return state;
    },
  },
});

export const userDataActions = userDataSlice.actions;
export default userDataSlice;

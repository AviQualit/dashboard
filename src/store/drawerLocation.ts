import { createSlice } from "@reduxjs/toolkit";

export interface IdrawerLocation {
  drawerOpen: boolean;
}

const initState: IdrawerLocation = {
  drawerOpen: false,
};
const drawerSlice = createSlice({
  name: "drawer",
  initialState: initState,
  reducers: {
    openOrClose(state, action) {
      state.drawerOpen = action.payload.open;

      //return state;
    },
  },
});

export const drawerActions = drawerSlice.actions;
export default drawerSlice;

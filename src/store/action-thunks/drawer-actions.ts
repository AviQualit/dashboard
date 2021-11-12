import { drawerActions } from "../drawerLocation";

export const openOrClose = (open: boolean) => {
  return async (dispatch: any) => {
    dispatch(
      drawerActions.openOrClose({
        open: open,
      })
    );
  };
};

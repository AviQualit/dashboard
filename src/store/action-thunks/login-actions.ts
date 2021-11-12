import { userDataActions } from "../userDataSlice";
import { useAppDispatch } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "..";

export const login = (
  email: string | undefined | HTMLInputElement,
  password: string | undefined | HTMLInputElement
) => {
  console.log(email);
  console.log(password);
  return async (dispatch: AppDispatch) => {
    dispatch(
      userDataActions.login({
        userName: "t@gmail.com",
        uid: "111",
        isAuthenticated: true,
        userEmail: "gmail",
      })
    );
  };
};

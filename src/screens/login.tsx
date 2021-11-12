import React from "react";
import {
  Button,
  Grid,
  Paper,
  Avatar,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  RootRef,
  TextField,
  OutlinedInput,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/action-thunks/login-actions";
import { useEffect } from "react";
import { IuserData } from "../store/userDataSlice";
import { useHistory } from "react-router-dom";

const Login: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const loginMail = React.useRef<HTMLInputElement>();
  const passwordRef = React.useRef<HTMLInputElement>();
  const storeState = useSelector((state: any) => state);
  const userData: IuserData | null = storeState?.userData;
  const history = useHistory();
  // useEffect(() => {
  //   console.log("dispached");
  // }, [dispatch]);
  const handleSubmit = () => {
    if (loginMail && passwordRef) {
      dispatch(login(loginMail.current?.value, passwordRef.current?.value));
      history.replace("/main");
    }
  };

  // useEffect(() => {
  //   if (userData?.isAuthenticated) {
  //     history.replace("/main");
  //   }
  // });

  const paperStyle: React.CSSProperties = {
    marginRight: "100px",
    marginLeft: "500px",
    padding: 20,
    height: "70vh",
    width: "40vh",
    alignContent: "center",
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              required
              id="outlined-basic"
              label="email"
              variant="outlined"
              inputRef={loginMail}
              type="email"
            />

            {/* <OutlinedInput
              id="my-input"
              aria-describedby="my-helper-text"
              ref={loginMail}
            /> */}
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
            <TextField
              required
              type="Password"
              id="outlined-basic"
              label="password"
              variant="outlined"
              inputRef={passwordRef}
            />
          </FormControl>
          <br />
          <Button type="submit">Login</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;

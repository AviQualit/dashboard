import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Todo from "./models/todo";
//import { Fragment, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import Login from "./screens/login";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import StatsByCountries from "./screens/statsByCountry";
import WorldStatistics from "./screens/worldStatistics";
import CompareCountries from "./screens/compareCountries";
import AppDrawer from "./components/Menu";
import useStyles from "./wrapperStyle";
import clsx from "clsx";
import News from "./screens/news";
function App() {
  const classes = useStyles();
  const isAuthenticated = useAppSelector(
    (state) => state.userData.isAuthenticated
  );
  const drawerState = useAppSelector((state) => state.drawer.drawerOpen);
  return (
    <div className={classes.root}>
      {isAuthenticated && <AppDrawer />}

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerState,
        })}
      >
        {isAuthenticated && <div className={classes.drawerHeader} />}
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>

          <Route path="/main" exact>
            <WorldStatistics />
          </Route>
          <Route path="/news" exact>
            <News />
          </Route>
          <Route path="/singleCountryAnalysis" exact>
            <StatsByCountries />
          </Route>
          {/* <Route path="*">
          <Redirect to="/" />
        </Route> */}
        </Switch>
      </main>
    </div>
  );
}

export default App;

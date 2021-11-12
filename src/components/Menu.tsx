import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Icon, SvgIconTypeMap } from "@material-ui/core";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import PublicOutlined from "@material-ui/icons/PublicOutlined";
import TvOutlined from "@material-ui/icons/TvOutlined";

import { openOrClose } from "../store/action-thunks/drawer-actions";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import StackedLineChartIcon from "@material-ui/icons/BarChart";

import StatsByCountries from "../screens/statsByCountry";

const drawerWidth = 240;
type screenPoperties = {
  path: string;
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

const AppDrawer: React.FC<{}> = (props) => {
  const open = useAppSelector((state) => state.drawer.drawerOpen);
  const dispatch = useDispatch();
  const history = useHistory();
  const [screens, setScreens] = useState<screenPoperties[]>([
    {
      path: "/main",
      icon: PublicOutlined,
      name: "Global statistics",
    },
    {
      path: "/news",
      icon: TvOutlined,
      name: "News",
    },
    {
      path: "/singleCountryAnalysis",
      icon: StackedLineChartIcon,
      name: "Data By Country",
    },
  ]);
  const [screenName, setScreenNmae] = useState<string>("Global statistics");
  const classes = useStyles();
  const theme = useTheme();
  //const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    dispatch(openOrClose(true));
    //setOpen(true);
  };

  const handleDrawerClose = () => {
    dispatch(openOrClose(false));
  };
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {screenName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {screens.map((screen, index) => (
            <ListItem
              button
              key={screen.name}
              onClick={() => {
                history.push(screen.path);
                setScreenNmae(screen.name);
              }}
            >
              <ListItemIcon>{<Icon component={screen.icon} />}</ListItemIcon>
              <ListItemText primary={screen.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default AppDrawer;

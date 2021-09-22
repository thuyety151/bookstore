import { IconButton, Theme } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { List } from "@material-ui/core";
import React from "react";
import ListItemRender from "./ListItemRenderHeader";
import logo from "../../../assets/images/book-worm.png";
import { Divider } from "@material-ui/core";
import icon from "../../../assets/icons/menu-bar.svg";

const NavBarComponent: React.FC<{openSideBar:boolean,setOpenSidebar:any}> = ({openSideBar,setOpenSidebar}) => {
  const classes = useStyles();
  const handleOpenSideBar = () => {
    setOpenSidebar(!openSideBar)
  };
  const hanleSearch = (key: any) => {
    console.log(key);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpenSideBar}
          >
            {/* <MenuIcon /> */}
            <img src={icon} style={{ height: 30 }} alt="icon" />
          </IconButton>
          <img src={logo} style={{ height: 64 }} alt="logo" />

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.rootList}
          >
            <ListItemRender />
          </List>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search by Keywords"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyPress={(e) => hanleSearch(e)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
};
export default NavBarComponent;
const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    display: "flex",
    backgroundColor: "#f6f5f3",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a0938f",
  },
  inputRoot: {
    color: "#7c6e65;",
    width: "20rem",
    padding: "5px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "20ch",
      },
    },
    "&::placeholder": {
      color: "#000",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
    display: "inline",
  },
  rootList: {
    width: "100%",
    color: "#000",
    display: "flex",
  },
  root: {
    flexGrow: 1,
    color: "red",
  },
  header: {
    color: "#000",
    backgroundColor: "#fff",
    height: "5rem",
    boxShadow: "none",
    justifyContent: "center",
    padding: theme.spacing(3, 4),
  },
  listItem: {
    display: "flex",
  },
  inline: {
    display: "inline",
  },
  toolbar: {
    justifyContent: "space-between",
  },
}));

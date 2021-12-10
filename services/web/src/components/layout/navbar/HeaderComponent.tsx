import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsCellOutlinedIcon from "@material-ui/icons/SettingsCellOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import SwapHorizOutlinedIcon from "@material-ui/icons/SwapHorizOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import { ListItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { RootStore } from "../../../redux/store";
import { useSelector } from "react-redux";
import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "row",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // marginLeft: "2rem",
    // marginRight: "2rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flex: "1 0 auto",
    margin: theme.spacing(1),
    display: "flex",
  },
  listItem: {
    display: "flex",
    width: "auto",
  },
}));

const HeaderComponent: React.FC<{
  setOpenCart: any;
}> = ({ setOpenCart }) => {
  const classes = useStyles();
  const totalItem = useSelector((state: RootStore) => state.cart.data.length);
  const history = useHistory();

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handlePersonOutLine = () => {
    history.push("/profile");
  };
  return (
    <div className={classes.root}>
      {/* <AppBar position="fixed" color="inherit" elevation={0}> */}
      <div className={clsx(classes.container, "main-header")}>
        <div className={classes.listItem}>
          <ListItem
            style={{ width: "20rem" }}
            button
            className="main-header__quote"
          >
            <HelpOutlineIcon />
            <span>Can we help you?</span>
          </ListItem>
          <ListItem button className="main-header__phone-number">
            <SettingsCellOutlinedIcon />
            <span>+84 123 456 789</span>
          </ListItem>
        </div>
        <div className={classes.listItem}>
          <ListItem button>
            <LocationOnOutlinedIcon />
          </ListItem>
          <ListItem button>
            <SwapHorizOutlinedIcon />
          </ListItem>
          <ListItem button>
            <FavoriteBorderOutlinedIcon />
          </ListItem>
          <ListItem button onClick={handlePersonOutLine}>
            <PersonOutlineOutlinedIcon />
          </ListItem>
          <ListItem button onClick={handleOpenCart}>
            <Badge badgeContent={totalItem} overlap="circular" color="error">
              <LocalMallOutlinedIcon />
            </Badge>
          </ListItem>
        </div>
      </div>
      <Divider />
      {/* </AppBar> */}
    </div>
  );
};
export default HeaderComponent;

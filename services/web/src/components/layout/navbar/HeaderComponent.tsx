import React from "react";
import clsx from "clsx";
import { makeStyles, Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsCellOutlinedIcon from "@material-ui/icons/SettingsCellOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import { ListItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { generatePath, useHistory } from "react-router-dom";
import { RootStore } from "../../../redux/store";
import { useSelector } from "react-redux";
import "./styles.scss";
import {
  ROUTE_LOCATION,
  ROUTE_PROFILE_PREDICATE,
} from "../../../routers/types";
// import { ROUTE_WISHLIST } from "../../../routers/types";

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
          <ListItem button onClick={() => history.push(ROUTE_LOCATION)}>
            <Tooltip title="Shop location" aria-label="Shop location">
              <LocationOnOutlinedIcon />
            </Tooltip>
          </ListItem>
          <ListItem
            button
            onClick={() =>
              history.push(
                generatePath(ROUTE_PROFILE_PREDICATE, {
                  tabName: "wishlist",
                })
              )
            }
          >
            <Tooltip title="Wishlist" aria-label="Wishlist">
              <FavoriteBorderOutlinedIcon />
            </Tooltip>
          </ListItem>
          <ListItem button onClick={handlePersonOutLine}>
            <Tooltip title="My account" aria-label="My account">
              <PersonOutlineOutlinedIcon />
            </Tooltip>
          </ListItem>
          <ListItem button onClick={handleOpenCart}>
            <Tooltip title="Cart" aria-label="Cart">
              <Badge badgeContent={totalItem} overlap="circular" color="error">
                <LocalMallOutlinedIcon />
              </Badge>
            </Tooltip>
          </ListItem>
        </div>
      </div>
      <Divider />
    </div>
  );
};
export default HeaderComponent;

import React from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "row",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: "2rem",
    marginRight: "2rem",
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
}> = ({  setOpenCart })  => {
  const classes = useStyles();
  const handleOpenCart=()=>{
    setOpenCart(true)
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.listItem}>
          <ListItem style={{ width: "20rem" }} button>
            <HelpOutlineIcon />
            <span>Can we help you?</span>
          </ListItem>
          <ListItem button>
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
          <ListItem button>
            <PersonOutlineOutlinedIcon />
          </ListItem>
          <ListItem button onClick={handleOpenCart}>
            <Badge badgeContent={4} overlap="circular" color="error">
              <LocalMallOutlinedIcon  />
            </Badge>
          </ListItem>
        </div>
      </div>
      <Divider />
    </div>
  );
};
export default HeaderComponent;

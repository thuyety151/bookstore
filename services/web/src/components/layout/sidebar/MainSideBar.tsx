/** @format */

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import CloseIcon from "@material-ui/icons/Close";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { dataHelpSetting } from "../../../mocks/sidebar";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import ChildSideBarComponent from "./SideBarItem";
import BottomSidebar from "./BottomSidebar";
import { RootStore } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getRoot } from "../../../redux/actions/category/getAction";
import { SideBarItem } from "../../../model/category";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

type Anchor = "left" | "right";

const SideBarComponent: React.FC<{
  openSideBar: boolean;
  setOpenSidebar: any;
}> = ({ openSideBar, setOpenSidebar }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector((state: RootStore) => state.category.data);
  const [currentId, setCurrentId] = useState<string>("");

  useEffect(() => {
    dispatch(getRoot());
  }, [dispatch]); // Only re-run the effect if dispatch changes

  const [categoryName, setCategoryName] = React.useState("");
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenSidebar(!openSideBar);
    };

  const [value, setValue] = React.useState(0);
  const handleBack = () => {
    setValue(0);
  };
  const handleNext = (id: string, name: string) => {
    setValue(1);
    setCategoryName(name);
    setCurrentId(id);
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.title}>
        <span>Shop by category</span>
        <CloseIcon
          onClick={toggleDrawer(anchor, false)}
          className={classes.iconNavigate}
        />
      </div>
      <Divider />
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        style={{ minHeight: "50vh" }}
      >
        {/* Tab all categories */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <List style={{ paddingTop: 0 }}>
            {data.map((item: SideBarItem, index: number) => (
              <ListItem
                button
                key={index}
                onClick={() => handleNext(item.id, item.name)}
                className={classes.items}
              >
                <span>{item.name}</span>
                {item.subTotal > 0 ? (
                  <NavigateNextIcon className={classes.iconNavigate} />
                ) : null}
              </ListItem>
            ))}
          </List>
        </TabPanel>
        {/* Tab expand of specific category */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div
            className={classes.header}
            style={{ backgroundColor: "#ffebed" }}
          >
            <NavigateBeforeIcon
              className={classes.iconNavigate}
              onClick={handleBack}
            />
            <span>{categoryName} </span>
            {/* <ListItemText primary={categoryName} style={{ paddingLeft: 10 }} /> */}
          </div>
          <List onClick={handleBack} style={{ paddingTop: 0 }}>
            <ChildSideBarComponent
              idCategory={currentId}
              closeSideBar={toggleDrawer(anchor, false)}
            />
          </List>
        </TabPanel>
      </SwipeableViews>
      <Divider />
      <div className={classes.helpSession}>
        <div className={classes.title}>
          <span>Help & Settings</span>
        </div>
        <List>
          {dataHelpSetting.map((item, index) => (
            <ListItem
              button
              key={index}
              className={classes.itemHelp}
              onClick={toggleDrawer(anchor, false)}
            >
              <span> {item.name} </span>
            </ListItem>
          ))}
        </List>
      </div>
      <Divider />
      <BottomSidebar />
    </div>
  );
  return (
    <div>
      <React.Fragment key="left">
        <Drawer
          anchor="left"
          open={openSideBar}
          onClose={toggleDrawer("left" as Anchor, false)}
        >
          {list("left" as Anchor)}
        </Drawer>
      </React.Fragment>
      {/* {(["left", "right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={ope}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
           <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer> 
        </React.Fragment>
      ))} */}
    </div>
  );
};
export default SideBarComponent;

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: "20vw",
  },
  fullList: {
    width: "auto",
  },
  title: {
    textTransform: "uppercase",
    padding: theme.spacing(2, 2),
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  paper: {
    margin: theme.spacing(1),
  },

  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    // stroke: theme.palette.divider,
    // strokeWidth: 1,
  },
  iconNavigate: {
    fontSize: 20,
    cursor: "pointer",
  },
  helpSession: {
    fontSize: 14,
  },
  itemHelp: {
    "&:hover": {
      color: "red",
    },
  },
  items: {
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
}));

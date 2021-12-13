import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import CloseIcon from "@material-ui/icons/Close";
import { dataHelpSetting } from "../../../mocks/sidebar";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ChildSideBarComponent from "./SideBarItem";
import BottomSidebar from "./BottomSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getRoot } from "../../../redux/actions/category/getAction";
import { SidebarCategoryResponse } from "../../../model/category";
import Skeleton from "@material-ui/lab/Skeleton";
import { RootStore } from "../../../redux/store";
import { Grid } from "@material-ui/core";
import "./styles.scss";

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

const MainSideBar: React.FC<{
  openSideBar: boolean;
  setOpenSidebar: any;
}> = ({ openSideBar, setOpenSidebar }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector((state: RootStore) => state.category.data);
  const [currentId, setCurrentId] = useState<string>("");
  const loading: Boolean = useSelector(
    (state: RootStore) => state.category.requesting
  );

  useEffect(() => {
    if (data.root?.length === 0) {
      dispatch(getRoot());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const [tabValue, setTabValue] = React.useState(0);
  const handleBack = () => {
    setTabValue(0);
  };
  const handleNext = (id: string, name: string) => {
    setTabValue(1);
    setCategoryName(name);
    setCurrentId(id);
  };
  const handleChildNavigate = () => {
    setTabValue(0);
    setOpenSidebar(false);
  };

  const list = (anchor: Anchor) => (
    <Grid
      className={clsx(classes.list)}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      item
      xs={4}
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
        index={tabValue}
        style={{ minHeight: "50vh" }}
      >
        {/* Tab all categories */}
        <TabPanel value={tabValue} index={0} dir={theme.direction}>
          <List style={{ paddingTop: 0 }}>
            {loading ? (
              <Skeleton />
            ) : (
              data.root?.map((item: SidebarCategoryResponse, index: number) => (
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
              ))
            )}
          </List>
        </TabPanel>
        {/* Tab expand of specific category */}
        <TabPanel value={tabValue} index={1} dir={theme.direction}>
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
          <List style={{ paddingTop: 0 }}>
            <ChildSideBarComponent
              idCategory={currentId}
              handleChildNavigate={handleChildNavigate}
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
    </Grid>
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
export default MainSideBar;

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    // width: "20vw",
    display: "contents",
    width: "100%",
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
    padding: theme.spacing(0, 1),
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

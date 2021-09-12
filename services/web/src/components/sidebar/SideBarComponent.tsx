import React from "react";
import clsx from "clsx";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import data, { dataHelpSetting } from "../../mocks/sidebar";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import ChildSideBarComponent from "../mainLayout/ChildSideBarComponent";
import BottomSidebar from "./BottomSidebar";

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

const SideBarComponent: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });
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

      setState({ ...state, [anchor]: open });
    };
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleBack = () => {
    setValue(0);
  };
  const handleNext = (name: string) => {
    setValue(1);
    setCategoryName(name);
  };
  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.title}>
        <ListItemText primary={"Shop by category"} />
        <CloseIcon
          onClick={toggleDrawer(anchor, false)}
          className={classes.iconNavigate}
        />
      </div>
      <Divider />
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        style={{minHeight:"50vh"}}
      >
        {/* Tab all categories */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <List style={{ paddingTop: 0 }}>
            {data.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleNext(item.name)}
              >
                <ListItemText primary={item.name} />
                <NavigateNextIcon className={classes.iconNavigate} />
              </ListItem>
            ))}
          </List>
        </TabPanel>
        {/* Tab expand of specific category */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className={classes.title} style={{ backgroundColor: "#ffebed" }}>
            <NavigateBeforeIcon
              className={classes.iconNavigate}
              onClick={handleBack}
            />
            <ListItemText primary={categoryName} style={{ paddingLeft: 10 }} />
          </div>
          <List onClick={handleBack} style={{ paddingTop: 0 }}>
            <ChildSideBarComponent
              idCategory={"1"}
              closeSideBar={toggleDrawer(anchor, false)}
            />
          </List>
        </TabPanel>
      </SwipeableViews>
      <Divider />
      <div className={classes.helpSession}>
        <div className={classes.title}>
          <ListItemText
            primary={"Help & Settings"}
            style={{ fontWeight: 500 }}
          />
        </div>
        <List>
          {dataHelpSetting.map((item, index) => (
            <ListItem button key={index} className={classes.itemHelp}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
      <Divider />
      <BottomSidebar />
    </div>
    
  );
  const theme = useTheme();
  return (
    <div>
      {(["left", "right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
          {/* <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer> */}
        </React.Fragment>
      ))}
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
    padding: theme.spacing(1, 2),
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
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
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  iconNavigate: {
    fontSize: 20,
    cursor: "pointer",
  },
  helpSession:{
    fontSize:14,  
  },
  itemHelp:{
    "&:hover": {
      color: "red",
    },
  }
}));

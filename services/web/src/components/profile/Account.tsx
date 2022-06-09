import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, Grid, Paper } from "@material-ui/core";
import ReceiptIcon from "@material-ui/icons/Receipt";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountDetail from "./AccountDetail";
import { userService } from "../../service/auth.service";
import { createBrowserHistory } from "history";
import AddressDashboard from "./address/AddressDashBoard";
import OrderDashboard from "./order/OrderDashboard";
import { useParams } from "react-router-dom";
import WishlistPage from "../../pages/wishlist/WishlistPage";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    marginLeft: "100px",
    "& .MuiTab-wrapper": {
      alignItem: "start !important",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      margin: 20,
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  paper: {
    width: "268px",
    height: "208px",
    position: "relative",
    border: "1px",
    [theme.breakpoints.down("sm")]: {
      width: "168px",
      height: "108px",
      margin: "10px 0px",
    },
  },
  box: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#f52f2f",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#f11b1b",
    },
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("sm")]: {
      width: "80px",
      height: "80px",
      margin: "10px 0px",
    },
  },
  icon: {
    width: "40px",
    height: "40px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  text: {
    margin: theme.spacing(3, 3),
    fontWeight: "bold",
  },
  mobileOnly: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  gridContainer: {
    [theme.breakpoints.down("sm")]: {
      flexWrap: "nowrap",
      gap: "20px",
    },
  },
}));

export const tabs = [
  "dashboard",
  "orders",
  "address",
  "shopping_cart",
  "account",
  "wishlist",
];

export default function MyAccount() {
  const classes = useStyles();
  const { tabName } = useParams() as any;
  const [value, setValue] = React.useState(tabs.indexOf(tabName) || 0);
  const history = createBrowserHistory({ forceRefresh: true });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  function handleLogout() {
    userService.logout();
    history.push("/login");
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={3} className={classes.mobileOnly}>
          <Typography variant="h4" align="left" className={classes.text}>
            My Account
          </Typography>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            className={classes.tabs}
          >
            <Tab label="Dashboard" {...a11yProps(0)} />
            <Tab label="Orders" {...a11yProps(1)} />
            <Tab label="Addresses" {...a11yProps(2)} />
            <Tab label="Shopping Cart" {...a11yProps(3)} />
            <Tab label="Account Detail" {...a11yProps(4)} />
            <Tab label="Wishlist" {...a11yProps(5)} />
          </Tabs>
        </Grid>
        <Grid item sm={9} xs={12}>
          <TabPanel value={value} index={0}>
            <Typography component="span" variant="h5" align="left">
              Dashboard
            </Typography>
            <Typography>Hello</Typography>
            <Typography>
              From your account dashboard you can view your recent orders,
              manage your shipping and billing addresses, and edit your password
              and account details.
            </Typography>
            <Grid container direction="row" className={classes.gridContainer}>
              <Paper className={classes.paper}>
                <Button className={classes.box} onClick={() => setValue(1)}>
                  <ReceiptIcon className={classes.icon} />
                </Button>
              </Paper>
              <Paper className={classes.paper}>
                <Button className={classes.box} onClick={() => setValue(2)}>
                  <LocationOnIcon className={classes.icon} />
                </Button>
              </Paper>
              <Paper className={classes.paper}>
                <Button className={classes.box} onClick={() => setValue(3)}>
                  <ShoppingBasketIcon className={classes.icon} />
                </Button>
              </Paper>
            </Grid>
            <Grid container direction="row" className={classes.gridContainer}>
              <Paper className={classes.paper}>
                <Button className={classes.box} onClick={() => setValue(4)}>
                  <PersonOutlineIcon className={classes.icon} />
                </Button>
              </Paper>
              <Paper className={classes.paper}>
                <Button className={classes.box} onClick={() => setValue(5)}>
                  <FavoriteBorderIcon className={classes.icon} />
                </Button>
              </Paper>
              <Paper className={classes.paper}>
                <Button className={classes.box} onClick={() => handleLogout()}>
                  <ExitToAppIcon className={classes.icon} />
                </Button>
              </Paper>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h5">Orders</Typography>
            <OrderDashboard />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h5">Addresses</Typography>
            <AddressDashboard />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Typography variant="h5">Your Cart</Typography>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Typography variant="h5">Account Details</Typography>
            <AccountDetail />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Typography variant="h5">Wishlish</Typography>
            <WishlistPage />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}

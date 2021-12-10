import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import BookItem from "./BookItem";
import { Grid, Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootStore } from "../../../redux/store";
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
    display: "flex",
    "& .MuiBox-root-80": {
      padding: 0,
    },
  },
  grid: {
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
  },
  itemContainer: {
    display: "table-cell",
    padding: "16px",
  },
  paper: {
    boxShadow: "none",
  },
  colContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  col: {
    display: "table-cell",
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const mostView = useSelector((state: RootStore) => state.mostView.data);
  const onSale = useSelector((state: RootStore) => state.onSale.data);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid item xs={9}>
        <Typography variant="h4" gutterBottom align="center">
          Featured Books
        </Typography>
        <Paper square className={classes.paper}>
          <Tabs value={value} onChange={handleChange} centered>
            {/* <Tab label="Featured" {...a11yProps(0)} /> */}
            <Tab label="Most View" {...a11yProps(0)} />
            <Tab label="On Sale" {...a11yProps(1)} />
          </Tabs>
        </Paper>

        <TabPanel value={value} index={0}>
          {mostView && (
            <Grid container justifyContent="flex-start">
              {mostView.map((item, index) => (
                <div className="featured-book-item" key={index}>
                  <BookItem item={item} />
                </div>
              ))}
            </Grid>
          )}
        </TabPanel>

        <TabPanel value={value} index={1}>
          {onSale && (
            <Grid
              container
              justifyContent="flex-start"
              // className={classes.grid}
            >
              {onSale.map((item, index) => (
                <div className="featured-book-item" key={index}>
                  <BookItem item={item} />
                </div>
              ))}
            </Grid>
          )}
        </TabPanel>
      </Grid>
    </div>
  );
}

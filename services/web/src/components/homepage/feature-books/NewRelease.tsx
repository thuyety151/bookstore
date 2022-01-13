import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import BookItem from "./BookItem";
import { Grid, Paper, Typography } from "@material-ui/core";
import img from "../../../assets/images/new-release.png";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../redux/store";
import { getNewReleases } from "../../../redux/actions/books/geNewRelease";
import { NewReleaseType } from "../../../model/newRelease";
import "./styles.scss";
import defaultBookUrl from "../../../assets/images/default.jpeg";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const defaultItems = [
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
];

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
    key: `tab-${index}`,
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
  },
  grid: {
    margin: "auto",
  },
  image: {
    backgroundColor: "#fff6f6",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "90%",
    maxHeight: "90%",
    marginTop: "200px",
  },
  paper: {
    backgroundColor: "white",
    boxShadow: "none",
    "& .MuiTabs-centered ": {
      justifyContent: "end",
    },
  },
}));

export default function NewRelease() {
  const classes = useStyles();
  const state = useSelector((state: RootStore) => state.newReleases);
  const [tab, setTab] = React.useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.data.length) {
      dispatch(getNewReleases());
    }
  }, [dispatch, state.data.length]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h4" gutterBottom>
              New Release
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper square className={classes.paper}>
              <Tabs value={tab} onChange={handleChange} centered>
                {state.data.map((c: NewReleaseType, index: number) => {
                  return <Tab label={c.categoryName} {...a11yProps(index)} />;
                })}
              </Tabs>
            </Paper>
          </Grid>
        </Grid>
        {state.data.length > 0 ? (
          state.data.map((value: NewReleaseType, index: number) => {
            return (
              <TabPanel value={tab} index={index} key={`tabpanel-${index}`}>
                <Grid container>
                  <Grid item xs={3} className={classes.image}>
                    <img className={classes.img} alt="complex" src={img} />
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container className={classes.grid}>
                      {value.books.map((item, ind) => (
                        <Grid
                          item
                          xs={3}
                          key={`${value.categoryId}-${ind}`}
                          className="new-release-item"
                        >
                          <BookItem item={item} />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </TabPanel>
            );
          })
        ) : (
          <TabPanel value={tab} index={0} key={`tabpanel-${0}`}>
            <Grid container>
              <Grid item xs={3} className={classes.image}>
                <img className={classes.img} alt="complex" src={img} />
              </Grid>
              <Grid item xs={9}>
                <Grid container className={classes.grid}>
                  { 
                  defaultItems.map((item, ind) => (
                    <Grid
                      item
                      xs={3}
                      className="new-release-item"
                    >
                     {item}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
        )}
      </Grid>
    </div>
  );
}

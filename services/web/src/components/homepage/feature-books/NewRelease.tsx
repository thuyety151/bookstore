import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import data from '../../../mocks/feature'
import BookItem from './BookItem';
import { Grid, Paper, Typography } from '@material-ui/core';
import img from '../../../assets/images/new-release.png';


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
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    margin: "auto"
  },
  image: {
    backgroundColor: "#fff6f6"
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '90%',
    maxHeight: '90%',
    marginTop: "200px"
  },
  paper: {
    backgroundColor: "white",
    boxShadow: "none",
    '& .MuiTabs-centered ': {
      justifyContent: "end"
    }

  },

}));

export default function NewRelease() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h4" gutterBottom align="center">
            New Release
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Paper square className={classes.paper} >
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="History" {...a11yProps(0)} />
              <Tab label="Scient & Math" {...a11yProps(1)} />
              <Tab label="Romance" {...a11yProps(2)} />
              <Tab label="Travel" {...a11yProps(3)} />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>



      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item xs={3} className={classes.image} justifyContent="center">
            <img className={classes.img} alt="complex" src={img} />
          </Grid>
          <Grid item container xs={9} justifyContent="center" className={classes.grid}>
            {data.map((item) => (
              <Grid item xs={3}>
                <BookItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container>
          <Grid item xs={3} className={classes.image} justifyContent="center">
            <img className={classes.img} alt="complex" src={img} />
          </Grid>
          <Grid item container xs={9} justifyContent="center" className={classes.grid}>
            {data.map((item) => (
              <Grid item xs={3}>
                <BookItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid container>
          <Grid item xs={3} className={classes.image} justifyContent="center">
            <img className={classes.img} alt="complex" src={img} />
          </Grid>
          <Grid item container xs={9} justifyContent="center" className={classes.grid}>
            {data.map((item) => (
              <Grid item xs={3}>
                <BookItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Grid container>
          <Grid item xs={3} className={classes.image} justifyContent="center">
            <img className={classes.img} alt="complex" src={img} />
          </Grid>
          <Grid item container xs={9} justifyContent="center" className={classes.grid}>
            {data.map((item) => (
              <Grid item xs={3}>
                <BookItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </TabPanel>

    </div>
  );
}

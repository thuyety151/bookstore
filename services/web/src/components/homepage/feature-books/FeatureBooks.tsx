import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import data from '../../../mocks/feature'
import BookItem from './BookItem';
import { Grid, Paper, Typography } from '@material-ui/core';

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
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom align="center">
        Featured Books
      </Typography>
      <Paper square >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Featured" {...a11yProps(0)} />
          <Tab label="On Sale" {...a11yProps(1)} />
          <Tab label="Most Viewed" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Grid container xs={10} justifyContent="center" className={classes.grid}>
          {data.map((item) => (
            <Grid item xs={3}>
              <BookItem item={item} />
            </Grid>
          ))}
        </Grid>

      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container xs={10} justifyContent="center" className={classes.grid}>
          {data.map((item) => (
            <Grid item xs={3}>
              <BookItem item={item} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container xs={10} justifyContent="center" className={classes.grid}>
          {data.map((item) => (
            <Grid item xs={3}>
              <BookItem item={item} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </div>
  );
}

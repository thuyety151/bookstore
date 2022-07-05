import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, createStyles, Divider, Grid, Tab, Tabs, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux/store';

const useStyles = makeStyles((theme: Theme) => 
createStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  rootAppBar: {
    flexGrow: 1,
  },
  tab: {
    padding: "50px 250px 20px 250px",
    [theme.breakpoints.down("sm")]: {
      padding: 10,
    },
  },
  text: {
    color: "#000000"
  },
  textDetail: {
    fontWeight: 600,
  }

})
);
  
export default function Types() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const { data } = useSelector((state: RootStore) => state.book);

  return (
    <div className={classes.rootAppBar}>
      <AppBar id="/description" position="static" color="default" elevation={0}>
        <Tabs
          centered
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Description" disabled />
          <Tab label="Product Details" className={classes.text} />
          <Tab label="Reviews" disabled />
        </Tabs>
        <Divider />
      </AppBar>
      <Box p={3} className={classes.tab}>
        {data && (
          <Grid container spacing={3}>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography className={classes.textDetail}>
                  Dimensions:
                </Typography>
              </Grid>
              <Grid item>
                <Typography>{data.dimensions}</Typography>
              </Grid>
            </Grid>

            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography className={classes.textDetail}>
                  Publication date:
                </Typography>
              </Grid>
              <Grid item>
                <Typography>{data.publicationDate.split("T")[0]}</Typography>
              </Grid>
            </Grid>

            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography className={classes.textDetail}>
                  Publisher:
                </Typography>
              </Grid>
              <Grid item>
                <Typography>{data.publisher}</Typography>
              </Grid>
            </Grid>

            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography className={classes.textDetail}>
                  Publication Country::
                </Typography>
              </Grid>
              <Grid item>
                <Typography>{data.publicationCountry}</Typography>
              </Grid>
            </Grid>

            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography className={classes.textDetail}>
                  Language:
                </Typography>
              </Grid>
              <Grid item>
                <Typography>{data.language}</Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
}

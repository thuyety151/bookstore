import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Divider, Grid, Tab, Tabs } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  rootAppBar: {
    flexGrow: 1,
  },
  tab: {
    padding: "50px 250px 20px 250px"
  },
  text: {
    color: "#e91e63"
  },
  textDetail: {
    fontWeight: 600,
  }
});

export default function Types() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.rootAppBar}>
      <AppBar id="/description" position="static" color="default">
        <Tabs centered value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example">
          <Tab label="Description" href="/description"  disabled/>
          <Tab label="Product Details" href="/detail" className={classes.text} />
          <Tab label="Videos" href="/video" disabled />

          <Tab label="Reviews" href="/review" disabled />
        </Tabs>
        <Divider />
      </AppBar>
      <Box p={3} className={classes.tab}>
        <Grid container spacing={3} >
          <Grid item container justifyContent="space-between">
            <Grid item ></Grid>
            <Typography className={classes.textDetail}>Format:</Typography>
            <Grid item>Paperback</Grid>
            <Typography></Typography>
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item alignItems="flex-start"></Grid>
            <Typography className={classes.textDetail}>Dimensions:</Typography>
            <Grid item>Paperback</Grid>
            <Typography></Typography>
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item></Grid>
            <Typography className={classes.textDetail}>Publication date:</Typography>
            <Grid item>Paperback</Grid>
            <Typography></Typography>
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item></Grid>
            <Typography className={classes.textDetail}>Publisher:</Typography>
            <Grid item>Paperback</Grid>
            <Typography></Typography>
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item></Grid>
            <Typography className={classes.textDetail}>Publication Country:</Typography>
            <Grid item>Paperback</Grid>
            <Typography></Typography>
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item></Grid>
            <Typography className={classes.textDetail}>Language:</Typography>
            <Grid item>Paperback</Grid>
            <Typography></Typography>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
}

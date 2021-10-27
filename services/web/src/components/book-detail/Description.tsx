import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Divider, Tab, Tabs } from '@material-ui/core';
import { RootStore } from '../../redux/store';
import { useSelector } from 'react-redux';

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
    color: "#e91e63",
    '&:hover': {
      cursor: "pointer"
    }
  },
  textDes: {
    textAlign: "left" 
  }

});

export default function Types() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const { data } = useSelector((state: RootStore) => state.book);

  return (
    <div className={classes.rootAppBar}>
      <AppBar id="/description" position="static" color="default">
        <Tabs centered value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example">
          <Tab label="Description" href="/description" />
          <Tab label="Product Details" href="/detail" disabled className={classes.text} />
          <Tab label="Videos" href="/video" disabled />
          <Tab label="Reviews" href="/review" disabled />
        </Tabs>
        <Divider />
      </AppBar>
      <Box p={3} className={classes.tab}>
        { data && 
          <Typography variant="body1" gutterBottom>
            {data.description}
        </Typography>
        }
      </Box>




    </div>
  );
}

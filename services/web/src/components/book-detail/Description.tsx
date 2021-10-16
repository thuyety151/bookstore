import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Divider, Tab, Tabs } from '@material-ui/core';

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
    '&:hover':{
      cursor: "pointer"
    }
},
});

export default function Types() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
          <Tab label="Description" href="/description" />
          <Tab label="Product Details" href="/detail" disabled className={classes.text} />
          <Tab label="Videos" href="/video" disabled />
          <Tab label="Reviews" href="/review" disabled />
        </Tabs>
        <Divider />
      </AppBar>
      <Box p={3} className={classes.tab}>
        <Typography variant="body1" gutterBottom>
          We aim to show you accurate product information. Manufacturers, suppliers and others provide what you see here, and we have not verified it. See our disclaimer

          #1 New York Times Bestseller

          A Reese Witherspoon x Hello Sunshine Book Club Pick

          "I can't even express how much I love this book! I didn't want this story to end!"--Reese Witherspoon

          "Painfully beautiful."--The New York Times Book Review

          "Perfect for fans of Barbara Kingsolver."--Bustle

          For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand. Then the time comes when she yearns to be touched and loved. When two young men from town become intrigued by her wild beauty, Kya opens herself to a new life--until the unthinkable happens.

          Perfect for fans of Barbara Kingsolver and Karen Russell, Where the Crawdads Sing is at once an exquisite ode to the natural world, a heartbreaking coming-of-age story, and a surprising tale of possible murder. Owens reminds us that we are forever shaped by the children we once were, and that we are all subject to the beautiful and violent secrets that nature keeps

          WHERE THE CRAWDADS LP
        </Typography>
      </Box>




    </div>
  );
}

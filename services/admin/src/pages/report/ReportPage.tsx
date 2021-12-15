import {
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";

const ReportPage: React.FC = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  return (
    <div>
      <Grid xs={12}>
        <Paper className={classes.paperNav}>
          <List
            component="nav"
            aria-label="secondary mailbox folder"
            className={classes.flexContainer}
          >
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemText primary="Year" className={classes.text}/>
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemText primary="Last Month" className={classes.text} />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemText primary="This Month" className={classes.text}/>
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemText primary="Last 7 days" className={classes.text} />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid container>
        <Grid item xs={3} className={classes.left}>
        <Paper className={classes.paperItem}>
            <Typography variant="h5">$320</Typography>
            <Typography variant="body2" color="textSecondary">
              net sales in this period
            </Typography>
          </Paper>
          <Paper className={classes.paperItem}>
            <Typography variant="h5">1</Typography>
            <Typography variant="body2" color="textSecondary">
              orders placed
            </Typography>
          </Paper>
          <Paper className={classes.paperItem}>
            <Typography variant="h5">5</Typography>
            <Typography variant="body2" color="textSecondary">
              items purchased
            </Typography>
          </Paper>
          <Paper className={classes.paperItem}>
            <Typography variant="h5">$0</Typography>
            <Typography variant="body2" color="textSecondary">
              refunded order
            </Typography>
          </Paper>
          <Paper className={classes.paperItem}>
            <Typography variant="h5">$0</Typography>
            <Typography variant="body2" color="textSecondary">
              charged for shipping
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9}></Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperNav: {
      background: "#fff",
      height: 50,
    },
    paperItem: {
      background: "#fff",
      height: 90,
      width: 250,
      padding: "20px 10px",
    },
    flexContainer: {
      display: "flex",
      flexDirection: "row",
      padding: 0,
    },
    left: {
        padding:10
    },
    text: {
        color: "#1167b1",
    }
  })
);

export default ReportPage;

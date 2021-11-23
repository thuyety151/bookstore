import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  AppBar,
  Box,
  Button,
  Divider,
  LinearProgress,
  Tab,
  Tabs,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import ReviewItem from "./ReviewItem";

import Rating from "@mui/material/Rating";
import { RootStore } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Review, CreateReview } from "../../model/review";
import { addReview } from "../../redux/actions/review/reviewAction";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "left",
    },
    tab: {
      padding: "50px 250px 20px 250px",
    },
    text: {
      color: "#e91e63",
    },
    form: {
      width: "956px",
    },
    button: {
      margin: "40px 0px 0px 0px",
    },
  })
);

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
      margin: "6px 0px 0px 0px",
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  })
)(LinearProgress);

export default function CenteredGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [value, setValue] = React.useState(3);

  const [rateValue, setRateValue] = React.useState<number | null>(5);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const { bookId } = useParams() as any;
  const reviews: Review[] | null = useSelector(
    (state: RootStore) => state.review.data
  );

  const handleSubmit = () => {
    const review: CreateReview = {
      id: uuidv4(),
      title: title,
      content: content,
      rate: rateValue,
      bookId: bookId,
    };
    dispatch(addReview(review));

    setTitle("");
    setContent("");
    setRateValue(5);
  };

  return (
    <div className={classes.root}>
      <AppBar id="review" position="static" color="default">
        <Tabs
          centered
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Description" disabled />
          <Tab label="Product Details" disabled />
          <Tab label="Videos" disabled />
          <Tab label="Reviews" />
        </Tabs>
        <Divider />
      </AppBar>
      <Box p={3} className={classes.tab}>
        <Grid container spacing={3} direction="column">
          <Grid item container spacing={3}>
            <Grid item xs={6} container direction="column">
              <Grid item>
                <Typography variant="h6" align="left">
                  Customer Reviews
                </Typography>
              </Grid>
              <Grid item container direction="row">
                <Grid item xs={3}>
                  <Typography variant="h3">4.6</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">3,714 reviews</Typography>
                  <Rating name="read-only" value={rateValue} readOnly />
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justifyContent="space-evenly"
              >
                <Grid item>
                  <Button variant="contained" color="secondary">
                    See all reviews
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary">
                    Write a review
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} container direction="column" spacing={2}>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={2}>
                  5 stars
                </Grid>
                <Grid item xs={8}>
                  <BorderLinearProgress variant="determinate" value={50} />
                </Grid>
                <Grid item xs={2}>
                  205
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={2}>
                  4 stars
                </Grid>
                <Grid item xs={8}>
                  <BorderLinearProgress variant="determinate" value={50} />
                </Grid>
                <Grid item xs={2}>
                  55
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={2}>
                  3 stars
                </Grid>
                <Grid item xs={8}>
                  <BorderLinearProgress variant="determinate" value={50} />
                </Grid>
                <Grid item xs={2}>
                  23
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={2}>
                  2 stars
                </Grid>
                <Grid item xs={8}>
                  <BorderLinearProgress variant="determinate" value={50} />
                </Grid>
                <Grid item xs={2}>
                  0
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={2}>
                  1 stars
                </Grid>
                <Grid item xs={8}>
                  <BorderLinearProgress variant="determinate" value={50} />
                </Grid>
                <Grid item xs={2}>
                  4
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h4">1-5 of 44 reviews</Typography>
            {reviews
              ? reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))
              : null}
          </Grid>

          <Grid item container>
            <Typography variant="h4"> Write a review</Typography>
            <Grid item container spacing={2}>
              <Grid item>
                <Typography variant="h6">
                  {" "}
                  Select a rating(required){" "}
                </Typography>
              </Grid>
              <Grid item>
                <Rating
                  name="simple-controlled"
                  value={rateValue}
                  onChange={(event, newValue) => {
                    setRateValue(newValue);
                  }}
                />
              </Grid>
            </Grid>
            <form className={classes.form}>
              <Grid item>
                <h4>Add a title</h4>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Title"
                  variant="filled"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item>
                <h4>Details please! Your review helps other shoppers.</h4>
              </Grid>
              <Grid item>
                <TextField
                  minRows={5}
                  fullWidth
                  label="Content"
                  variant="filled"
                  multiline
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Grid>
              <Grid item className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit Review
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

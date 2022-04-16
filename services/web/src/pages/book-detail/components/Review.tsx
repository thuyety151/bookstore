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
import { RootStore } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CreateReview } from "../../../model/review";
import { addReview, getReviews } from "../../../redux/actions/review/reviewAction";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "left",
    },
    tab: {
      padding: "50px 250px 20px 250px",
      [theme.breakpoints.down("sm")]: {
        padding: 10,
      },
    },
    text: {
      color: "#000000",
    },
    form: {
      width: "956px",
    },
    button: {
      margin: "40px 0px 0px 0px",
      textTransform: "none",
      color: "white",
      background: "#000000",
    },
    rate: {
      color: "#ffbf00 !important",
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
      backgroundColor: "#ffbf00",
    },
  })
)(LinearProgress);

export default function CenteredGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [value, setValue] = React.useState(3);
  const [page, setpage] = useState(1);
  const [rateValue, setRateValue] = React.useState<number | null>(5);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const { bookId } = useParams() as any;
  const reviews = useSelector((state: RootStore) => state.review);

  const totalReview = reviews.data.length;
  const rates = reviews.data.map((review) => review.rate);
  const sumRate = rates.reduce(
    (a, b) => (a !== null && b !== null ? a + b : 0),
    0
  );
  const avgRate = sumRate ? sumRate / rates.length : 0;
  const { enqueueSnackbar } = useSnackbar();
  const totalFiveStar = rates.filter((rate) => rate === 5).length;
  const totalFourStar = rates.filter((rate) => rate === 4).length;
  const totalThreeStar = rates.filter((rate) => rate === 3).length;
  const totalTwoStar = rates.filter((rate) => rate === 2).length;
  const totalOneStar = rates.filter((rate) => rate === 1).length;

  const handleSubmit = () => {
    const review: CreateReview = {
      id: uuidv4(),
      title: title,
      content: content,
      rate: rateValue,
      bookId: bookId,
    };
    dispatch(
      addReview({
        review,
        onSuccess: () => {
          dispatch(getReviews(bookId));
          setpage(1);
          enqueueSnackbar("Comment successfully!", { variant: "success" });
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );

    setTitle("");
    setContent("");
    setRateValue(5);
  };
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setpage(value);
    dispatch(getReviews(bookId, { ...reviews.pagination, pageIndex: value }));
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
          <Tab label="Reviews" className={classes.text} />
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
                  <Typography variant="h3">{avgRate}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">{totalReview} reviews</Typography>
                  <Rating name="read-only" value={avgRate} readOnly />
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justifyContent="space-evenly"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    className={classes.button}
                    href="#all-reviews"
                  >
                    See all reviews
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    className={classes.button}
                    href="#form-add-review"
                  >
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
                  <BorderLinearProgress
                    variant="determinate"
                    value={totalFiveStar}
                  />
                </Grid>
                <Grid item xs={2}>
                  {totalFiveStar}
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={2}>
                  4 stars
                </Grid>
                <Grid item xs={8}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={totalFourStar}
                  />
                </Grid>
                <Grid item xs={2}>
                  {totalFourStar}
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={2}>
                  3 stars
                </Grid>
                <Grid item xs={8}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={totalThreeStar}
                  />
                </Grid>
                <Grid item xs={2}>
                  {totalThreeStar}
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={2}>
                  2 stars
                </Grid>
                <Grid item xs={8}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={totalTwoStar}
                  />
                </Grid>
                <Grid item xs={2}>
                  {totalTwoStar}
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={2}>
                  1 stars
                </Grid>
                <Grid item xs={8}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={totalOneStar}
                  />
                </Grid>
                <Grid item xs={2}>
                  {totalOneStar}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item id="all-reviews">
            {reviews.data
              ? reviews.data.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))
              : null}
            {reviews.pagination.totalPage ? (
              <Pagination
                count={reviews.pagination.totalPage}
                page={page}
                onChange={handleChangePage}
              />
            ) : null}
          </Grid>

          <Grid item container id="form-add-review">
            <Typography variant="h6"> Write a review</Typography>
            <Grid item container spacing={2}>
              <Grid item>
                <Typography variant="body1"> Select a rating: </Typography>
              </Grid>
              <Grid item>
                <Rating
                  name="simple-controlled"
                  className={classes.rate}
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
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.button}
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

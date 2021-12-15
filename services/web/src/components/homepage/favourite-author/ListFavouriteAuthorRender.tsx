import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import AuthorItem from "./AuthorItem";
import "../bestseller/slideEffect.css";
import { useHistory } from "react-router-dom";
import { getAllAuthor } from "../../../redux/actions/author/getActions";
import { RootStore } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 5 },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      // padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    title: {
      justifyContent: "space-between",
      alignItems: "center",
    },
    viewAll: {
      display: "flex",
      alignItems: "center",
      "&:hover": {
        cursor: "pointer",
        color: "red",
        "& .icon": {
          fill: "red",
        },
      },
    },
  })
);
const SlideEffect: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const authors = useSelector((state: RootStore) => state.author);

  const handleNavBook = (id?: string) => {
    if (id) {
      history.push(`/book/${id}`);
    } else {
      history.push(`/book`);
    }
  };

  useEffect(() => {
    dispatch(getAllAuthor());
  }, [dispatch]);

  const items = authors.data?.map((item, index) => {
    return (
      <div data-value="1" key={index}>
        <AuthorItem author={item} />
      </div>
    );
  });
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} className={classes.title}>
          <Grid item>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Favorite Authors
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            className={classes.viewAll}
            onClick={() => handleNavBook()}
          ></Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            <AliceCarousel
              mouseTracking
              disableDotsControls
              items={items}
              responsive={responsive}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SlideEffect;

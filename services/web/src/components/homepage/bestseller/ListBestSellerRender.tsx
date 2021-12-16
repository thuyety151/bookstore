import { Grid, Paper, SvgIcon, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import BestSellerComponent from "./BestSellerBanner";
import "./slideEffect.css";
import { ReactComponent as Icon } from "../../../assets/images/themifyIcon/angle-right.svg";
import { generatePath, useHistory } from "react-router-dom";
import { RootStore } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getBestSelling } from "../../../redux/actions/books/getBestSelling";
import { Predicate, ROUTE_BOOKS_FOR_SALE } from "../../../routers/types";
import { Book } from "../../../model";
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

const SlideEffect: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.bestSelling);

  useEffect(() => {
    dispatch(getBestSelling());
  }, [dispatch]);

  const handleNavBook = (book?: Book) => {
    history.push(
      generatePath(ROUTE_BOOKS_FOR_SALE, {
        predicate: Predicate.Popular,
      })
    );
  };

  const items = state.data.map((item, index) => {
    return (
      <div key={index}>
        <BestSellerComponent item={item} />
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
                Bestselling Books
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            className={classes.viewAll}
            onClick={() => handleNavBook()}
          >
            <Typography variant="subtitle1" gutterBottom>
              View All
            </Typography>
            <SvgIcon component={Icon} className="icon" />
          </Grid>
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
      display: "flex",
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
export default SlideEffect;

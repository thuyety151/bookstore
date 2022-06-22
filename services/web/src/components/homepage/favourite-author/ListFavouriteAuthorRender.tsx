import { Grid, Paper, SvgIcon, Typography } from "@material-ui/core";
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
import { ROUTE_AUTHOR } from "../../../routers/types";
import { ReactComponent as Icon } from "../../../assets/images/themifyIcon/angle-right.svg";

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
const SlideEffect: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const authors = useSelector((state: RootStore) => state.author);
  const handleNavBook = (id?: string) => {
    history.push(ROUTE_AUTHOR);
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
              disableButtonsControls
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

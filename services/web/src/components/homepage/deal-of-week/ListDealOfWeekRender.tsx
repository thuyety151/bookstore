import { Grid, Paper, SvgIcon, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import DealItem from "./DealItem";
import "../bestseller/slideEffect.css";
import { ReactComponent as Icon } from "../../../assets/images/themifyIcon/angle-right.svg";
import { generatePath, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../../redux/store";
import { Predicate, ROUTE_BOOKS_FOR_SALE } from "../../../routers/types";
import "../bestseller/styles.scss";
const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 2 },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
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
  const handleNavBook = (id?: string) => {
    history.push(
      generatePath(ROUTE_BOOKS_FOR_SALE, {
        predicate: Predicate.Popular,
      })
    );
  };

  const dealOfWeek = useSelector((state: RootStore) => state.dealOfWeek);

  const items = dealOfWeek.data.map((item, index) => {
    return (
      <div data-value="1" key={index}>
        <DealItem item={item} />
      </div>
    );
  });

  const [thumbIndex, setThumbIndex] = useState(0);

  const slideNext = () => {
    if (thumbIndex < items.length - 1) {
      setThumbIndex(thumbIndex + 1);
    }
  };

  const slidePrev = () => {
    if (thumbIndex > 0) {
      setThumbIndex(thumbIndex - 1);
    }
  };

  const syncThumbs = (e: any) => {
    setThumbIndex(e.item);
  };

  return (
    <div className="thumbs">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container justifyContent="center" className={classes.title}>
          <Grid item>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Deals of the Week
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
              activeIndex={thumbIndex}
              disableDotsControls
              disableButtonsControls
              items={items}
              mouseTracking
              responsive={responsive}
              onSlideChanged={syncThumbs}
            />
          </Paper>
        </Grid>
      </Grid>

      <div className="btn-prev" onClick={slidePrev}>
        &lang;
      </div>
      <div className="btn-next" onClick={slideNext}>
        &rang;
      </div>
    </div>
  );
};

export default SlideEffect;

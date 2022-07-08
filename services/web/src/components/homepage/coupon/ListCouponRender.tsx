import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../../slideEffect.css";
import { RootStore } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import "../../styles.scss";
import defaultBookUrl from "../../../assets/images/default.jpeg";
import { getCoupons } from "../../../redux/actions/coupon/getAction";
import CouponCard from "./CouponCard";
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

const defaultItems = [
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
]; 

const ListCouponRender: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const coupons = useSelector((state: RootStore) => state.coupons);

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const defaultThumbItems = defaultItems.map((item: any, index: any) => {
    return <div className="thumb">{item}</div>;
  });

  const items = coupons.homepageCoupons.map((item, index) => {
    return (
      <div key={index}>
        <CouponCard coupon={item} isUserCoupon={false} isSelection={false} calTotalCart={() => null}/>
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
        <Grid item xs={12} className={classes.title}>
          <Grid item>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Coupons
              </Typography>
            </Grid>
          </Grid>
         
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            <AliceCarousel
              activeIndex={thumbIndex}
              disableDotsControls
              disableButtonsControls
              items={items.length > 0 ? items : defaultThumbItems}
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
export default ListCouponRender;

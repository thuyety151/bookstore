import { Grid, Paper, SvgIcon, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import DealItem from "./DealItem";
import "../bestseller/slideEffect.css";
import { ReactComponent as Icon } from "../../../assets/images/themifyIcon/angle-right.svg";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../../redux/store";
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
  const history= useHistory();
  const handleNavBook=(id?:string)=>{
    if(id){
      history.push(`/book/${id}`)
    } else {
      history.push(`/book`)
    }
  }

  const dealOfWeek = useSelector((state: RootStore) => state.dealOfWeek.data);

  const items = dealOfWeek?.map((item, index) => {
    return (
      <div data-value="1" key={index}>
        <DealItem item={item} />
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
        <Grid item xs={9} container className={classes.title}>
          <Grid item>
            <Grid item>
              <Typography variant="h4" gutterBottom>
               Deals of the Week
              </Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.viewAll} onClick={()=>handleNavBook()}>
            <Typography variant="subtitle1" gutterBottom>
              View All
            </Typography>
            <SvgIcon component={Icon} className="icon" />
          </Grid>
        </Grid>
        <Grid item xs={9}>
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

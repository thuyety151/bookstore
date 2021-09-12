import { Grid, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import data from "../../mocks/bestsaling";
import BestSellerComponent from "./BestSellerComponent";
import "./slideEffect.css";
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 5 },
};

const items = data.map((item, index) => {
return (
    <div  data-value="1" key={index}>
      <BestSellerComponent item={item} />
    </div>
  );
});
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);
const SlideEffect: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={10} spacing={3}>
          <Paper className={classes.paper} elevation={0} >
            {" "}
            <AliceCarousel
              mouseTracking
              disableDotsControls
              items={items}
              paddingLeft={50}
              paddingRight={50}
              responsive={responsive}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SlideEffect;

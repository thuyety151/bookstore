import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import "./slideEffect.css";

// const responsive = {
//   0: { items: 1 },
//   568: { items: 2 },
//   1024: { items: 4 },
// };

// const items = data.map((item, index) => {
//   return (
//     <div data-value="1" key={index}>
//       <BestSellerComponent item={item} />
//     </div>
//   );
// });
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
const RecommendBooks: React.FC = () => {
  const classes = useStyles();

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
              Customers Also Considered
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper} elevation={0}>
            {/* <AliceCarousel
              mouseTracking
              disableDotsControls
              items={items}
              responsive={responsive}
            /> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecommendBooks;

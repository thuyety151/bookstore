import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import DescriptionComponent from "./Description";
import ProductDetailsComponent from "./ProductDetails";
import ReviewComponent from "./Review";


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },

  text: {
    color: "#e91e63",
  },
  tab: {
    padding: "50px 250px 20px 250px",
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DescriptionComponent />

      <ProductDetailsComponent />

      <ReviewComponent />

      {/* <RecommendBooksComponent/> */}
    </div>
  );
}

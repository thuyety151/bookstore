import React from "react";
import DealItem from "../../components/DealItem";
import Categories from "../../components/homepage/category/CategoriesBanner";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import ListBestSellingComponent from "../../components/homepage/bestseller/ListBestSellerRender";
const HomePage: React.FunctionComponent<{}> = (props) => {
  const classes=useStyles()
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12} className={classes.item} >
          <Categories />
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <ListBestSellingComponent />
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <DealItem />
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    item: {
      margin: theme.spacing(5,0),
    },
  })
);
export default HomePage;

import { Grid } from "@material-ui/core";
import React from "react";
import BooksForSaleComponent from "../../components/books-for-sale/BooksForSale";
import ListBookForSale from "./ListBookForSale";

const BooksForSalePage: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="App">
      <Grid container direction="row">
        <Grid item xs={4}>
          <BooksForSaleComponent />
        </Grid>
        <Grid item xs={7} >
        <ListBookForSale />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default BooksForSalePage;

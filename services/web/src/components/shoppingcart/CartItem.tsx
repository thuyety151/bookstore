import React from "react";
import {
  ButtonBase,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Item from "../../model/item";
import { generatePath, useHistory } from "react-router-dom";
import { ROUTE_BOOK_DETAIL } from "../../routers/types";

const CartItem: React.FC<{ item: Item; closeCart: void }> = (
  item,
  closeCart
) => {
  const classes = useStyles();
  const history = useHistory();

  const handleNavBook = () => {
    history.push(
      generatePath(ROUTE_BOOK_DETAIL, {
        bookId: item.item.id,
        attributeId: item.item.attributeId,
      })
    );
    // closeCart(false);
  };

  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        elevation={0}
        square
        onClick={handleNavBook}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={3}
        >
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.image}
                src={item.item.pictureUrl}
                alt="img"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs container direction="column">
            <Grid item>
              <Typography
                gutterBottom
                variant="overline"
                className={classes.atribute}
              >
                {item.item.attributeName}
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle1"
                className={classes.name}
              >
                {item.item.productName}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                className={classes.author}
              >
                {item.item.authorName}
              </Typography>
            </Grid>
            {!item.item.price ? (
              <Grid item>
                <Typography
                  variant="subtitle1"
                  className={classes.currentPrice}
                >
                  {item.item.price}
                </Typography>
              </Grid>
            ) : (
              <Grid item className={classes.rootPrice}>
                <Typography
                  variant="subtitle1"
                  className={classes.currentPrice}
                >
                  {item.item.price}
                </Typography>
                <Typography variant="subtitle1" className={classes.salePrice}>
                  {item.item.price}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid item className={classes.extension}>
            <CloseIcon style={{ fontSize: 20 }} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    image: {
      // width: 200,
      height: 200,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      // maxWidth: 500,
      textAlign: "left",
      "&:hover": {
        borderColor: "#000",
      },
    },
    name: {
      fontWeight: 700,
    },
    author: {
      color: "gray",
      "&:hover": {
        color: "red",
        cursor: "pointer",
        fontWeight: 700,
      },
    },
    salePrice: {
      textDecorationLine: "line-through",
      color: "gray",
      fontSize: 13,
      paddingLeft: "5px",
    },
    currentPrice: {
      fontWeight: 700,
    },
    rootPrice: {
      alignItems: "center",
      display: "flex",
    },
    atribute: {
      color: "red",
      "&:hover": {
        color: "red",
        cursor: "pointer",
        fontWeight: 700,
      },
    },
    extension: {
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
    },
    favorite: {
      "&:hover": {
        color: "red",
        cursor: "pointer",
      },
    },
  })
);

export default CartItem;

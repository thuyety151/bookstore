import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Book } from "../../../model";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import { ROUTE_BOOK, ROUTE_BOOK_DETAIL } from "../../../routers/types";
import { generatePath, useHistory } from "react-router-dom";
import defaultBook from "../../../assets/images/default.jpeg";
import clsx from "clsx";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { addOrUpdateItem } from "../../../redux/actions/cart/addOrUpdateAction";

const BookItem: React.FC<{ item: Book }> = (props) => {
  const { item } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleNavBook = () => {
    if (item.id) {
      history.push(
        generatePath(ROUTE_BOOK_DETAIL, {
          bookId: item.id,
          attributeId: item.attributeId,
        })
      );
    } else {
      history.push(ROUTE_BOOK);
    }
  };
  const handleAddtoCart = () => {
    dispatch(
      addOrUpdateItem({
        item: {
          productId: item.id,
          quantity: 1,
          attributeId: item.attributeId,
        },
        onSuccess: () => {
          enqueueSnackbar("Add to cart successfully!", { variant: "success" });
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };
  return (
    <div className={clsx(classes.root, "featured-item")}>
      <Paper className={classes.paper} variant="outlined" square>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item onClick={handleNavBook}>
            <img
              className={classes.image}
              src={item.pictureUrl ?? defaultBook}
              alt="img"
            />
            {/* </ButtonBase> */}
          </Grid>
          <Grid item xs container direction="column">
            <Grid item>
              <Typography
                gutterBottom
                variant="overline"
                className={classes.atribute}
              >
                {item.attribute}
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle1"
                className={classes.name}
                onClick={handleNavBook}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                className={classes.author}
              >
                {item.author}
              </Typography>
            </Grid>
            {!item.salePrice || item.salePrice === item.price ? (
              <Grid item>
                <Typography
                  variant="subtitle1"
                  className={classes.currentPrice}
                >
                  ${item.price}
                </Typography>
              </Grid>
            ) : (
              <Grid item className={classes.rootPrice}>
                <Typography
                  variant="subtitle1"
                  className={classes.currentPrice}
                >
                  ${item.salePrice}
                </Typography>
                <Typography variant="subtitle1" className={classes.salePrice}>
                  ${item.price}
                </Typography>
              </Grid>
            )}
            <Grid item className={classes.extension}>
              <Typography
                gutterBottom
                variant="subtitle1"
                className={classes.addToCart}
                onClick={handleAddtoCart}
              >
                ADD TO CART
              </Typography>
              <FavoriteBorderOutlined className={classes.favorite} />
            </Grid>
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
      height: "100%",
    },
    image: {
      width: "100%",
      height: "auto",
      maxHeight: "12rem",
    },
    paper: {
      padding: theme.spacing(0, 2),
      margin: "auto",
      height: "100%",
      textAlign: "left",
      cursor: "pointer",
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
    addToCart: {
      fontWeight: 700,
      "&:hover": {
        color: "red",
      },
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

export default BookItem;

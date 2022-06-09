import {
  Button,
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
import { generatePath, useHistory } from "react-router-dom";
import { ROUTE_BOOK_DETAIL } from "../../../routers/types";
import { useSnackbar } from "notistack";
import { addOrUpdateItem } from "../../../redux/actions/cart/addOrUpdateAction";
import { useDispatch } from "react-redux";
import { addToWL } from "../../../redux/actions/wishlist/postActions";

const BestSellerComponent: React.FC<{ item: Book }> = (props) => {
  const { item } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleNavBook = () => {
    if (item?.id) {
      history.push(
        generatePath(ROUTE_BOOK_DETAIL, {
          bookId: item?.id,
          attributeId: item?.attributeId,
        })
      );
    } else {
      history.push(`/book`);
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
          enqueueSnackbar("Add to cart successfully!", {
            variant: "success",
          });
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };

  const addToWishlist = () => {
    dispatch(
      addToWL({
        item: {
          productId: item.id,
          attributeId: item.attributeId,
          // TODO: Remove params quantity in BE & FE
          quantity: 1,
        },
        onSuccess: () => {
          enqueueSnackbar("Add to wishlist successfully!", {
            variant: "success",
          });
        },
        onFailure: (e) => {
          enqueueSnackbar(e, { variant: "error" });
        },
      })
    );
  };

  return (
    <Paper className={classes.paper} variant="outlined" square>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item onClick={handleNavBook}>
          <img className={classes.image} src={item.pictureUrl} alt="img" />
        </Grid>
        <Grid item xs container direction="column" className={classes.grid}>
          <Grid item>
            <Typography
              gutterBottom
              variant="overline"
              className={classes.atribute}
            >
              {item.attributeName}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              className={classes.name}
              onClick={handleNavBook}
            >
              {item.name}
            </Typography>
            <Typography variant="body2" gutterBottom className={classes.author}>
              {item.author}
            </Typography>
          </Grid>
          {!item.salePrice ? (
            <Grid item>
              <Typography variant="subtitle1" className={classes.currentPrice}>
                ${item.price}
              </Typography>
            </Grid>
          ) : (
            <Grid item className={classes.rootPrice}>
              <Typography variant="subtitle1" className={classes.currentPrice}>
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
            <Button onClick={addToWishlist}>
              <FavoriteBorderOutlined className={classes.favorite} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    // </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    image: {
      maxHeight: "10rem",
      width: "100%",
      height: "auto",
    },
    paper: {
      padding: theme.spacing(1, 2),
      // margin: "auto",
      margin: theme.spacing(1, 1),
      // maxWidth: 500,
      textAlign: "left",
      height: "100%",
      "&:hover": {
        borderColor: "#000",
        zIndex: 1,
      },
    },
    name: {
      fontWeight: 700,
    },
    addToCart: {
      fontWeight: 700,
      "&:hover": {
        color: "red",
      },
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
    grid: {
      minHeight: 250,
    },
  })
);

export default BestSellerComponent;

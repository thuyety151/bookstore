import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import {
  Button,
  ButtonGroup,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../redux/store";
import Attribute from "../../model/attribute";
import AddOrUpdateItem from "../../model/AddOrUpdateItem";
import { addOrUpdateItem } from "../../redux/actions/cart/addOrUpdateAction";
import Item from "../../model/item";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";
import defaultBook from "../../assets/images/default.jpeg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      textAlign: "left",
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "70%",
      maxHeight: "100%",
    },
    attribute: {
      color: "red",
      "&:hover": {
        color: "red",
        cursor: "pointer",
        fontWeight: 700,
      },
    },
    favorite: {
      "&:hover": {
        color: "red",
        cursor: "pointer",
      },
    },
    button: {
      textTransform: "none",
      margin: "5px 20px 5px 70px",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    buttonAddToCart: {
      textTransform: "none",
      minWidth: 300,
      color: "white",
      background: "#000000",
    },
    text: {
      fontWeight: 600,
    },
  })
);

export default function DetailBook() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState<number>(1);
  const displayCounter = true;
  const { bookId, attributeId } = useParams() as any;

  const { data } = useSelector((state: RootStore) => state.book);

  const attributeDb = attributeId
    ? (data?.attributes?.find(
        (x) => x.id.toLowerCase() === attributeId
      ) as Attribute)
    : (data?.attributes[0] as Attribute);

  const myCart: Item[] = useSelector((state: RootStore) => state.cart.data);
  const [attribute, setAttribute] = useState<Attribute>(attributeDb);
  const { enqueueSnackbar } = useSnackbar();

  const rateValue = 5;

  useEffect(() => {
    setAttribute(attributeDb);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAttribute(attribute);
  }, [attribute]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const attributeId = event.target.value;
    var attribute = data?.attributes.find((x) => x.id === attributeId);
    if (attribute) {
      setAttribute(attribute);
    }
  };

  function handleDecreaseCounter() {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  }

  function handleIncreaseCounter() {
    if (attribute && counter < attribute.totalStock) {
      setCounter(counter + 1);
    }
  }

  function handleAddToCart() {
    var item: AddOrUpdateItem = {
      productId: bookId,
      attributeId: attributeId,
      quantity: counter,
    };

    const itemQuantityToUpdate = myCart.find(
      (x) =>
        x.productId === item.productId && x.attributeId === item.attributeId
    )?.quantity;

    if (itemQuantityToUpdate) {
      item.quantity = itemQuantityToUpdate + counter;
    }

    dispatch(
      addOrUpdateItem({
        item,
        onSuccess: () => {
          enqueueSnackbar("Add to cart successfully!", { variant: "success" });
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {data && (
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <ButtonBase>
                <img
                  className={classes.img}
                  alt="complex"
                  src={data.media[0].url ?? defaultBook}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={7} container spacing={2}>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item>
                  <Typography gutterBottom variant="h3">
                    {data.name}
                  </Typography>
                </Grid>
                <Grid item container direction="row">
                  <Grid item>
                    <Rating name="read-only" value={rateValue} readOnly />
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="body2">
                      (3,714) By (author) {data.authorName}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  {attribute && (
                    <Typography
                      gutterBottom
                      variant="h5"
                      className={classes.text}
                    >
                      {attribute.price} $
                    </Typography>
                  )}
                </Grid>

                <Grid item>
                  <Typography gutterBottom variant="body2">
                    Book Format: Choose an option
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={attribute?.id ?? attributeId}
                      onChange={handleChange}
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {data.attributes
                        ? data.attributes.map((attr) => (
                            <MenuItem key={attr.id} value={attr.id}>
                              {attr.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item>
                  <Typography gutterBottom variant="body2">
                    {data.shortDescription}
                  </Typography>
                </Grid>
                <Grid item container direction="row" spacing={3}>
                  <Grid item>
                    <ButtonGroup
                      size="large"
                      aria-label="small outlined button group"
                    >
                      <Button onClick={handleDecreaseCounter}>-</Button>
                      {displayCounter && <Button disabled>{counter}</Button>}
                      {displayCounter && (
                        <Button onClick={handleIncreaseCounter}>+</Button>
                      )}
                    </ButtonGroup>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleAddToCart}
                      className={classes.buttonAddToCart}
                      size="large"
                      variant="contained"
                    >
                      Add to cart
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container direction="row" spacing={2}>
                  <Grid
                    item
                    xs={3}
                    container
                    direction="row"
                    className={classes.favorite}
                  >
                    <Grid item>
                      <FavoriteBorderOutlined />
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="body1">
                        Add to Wishlist
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    container
                    direction="row"
                    className={classes.favorite}
                  >
                    <Grid item>
                      <ShareOutlinedIcon />
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="body1">
                        Share
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  );
}

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
import NegativeAlert from "../core/alert/NegativeAlert";
import Attribute from "../../model/attribute";
import AddOrUpdateItem from "../../model/AddOrUpdateItem";
import { addOrUpdateItem } from "../../redux/actions/cart/addOrUpdateAction";
import Item from "../../model/item";

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
      maxWidth: "80%",
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

  //hard data
  // const bookId = "367B359F-CDE9-4D15-BC37-08D99961828A";
  const attributeId = "94B5913A-2B6F-47ED-270D-08D999618231";
  const { success, message, data } = useSelector(
    (state: RootStore) => state.book
  );
  const myCart: Item[] = useSelector((state: RootStore) => state.cart.data);
  const [attribute, setAttribute] = useState<Attribute | null>();

  const attributeDb = data?.attributes.find(
    (x) => x.id === attributeId
  ) as Attribute;

  const rateValue = 5;

  useEffect(() => {
    if (!attribute) {
      setAttribute(attributeDb);
    }
  });

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
      productId: "367b359f-cde9-4d15-bc37-08d99961828a",
      attributeId: "94b5913a-2b6f-47ed-270d-08d999618231",
      quantity: counter,
    };

    const itemQuantityToUpdate = myCart.find(
      (x) =>
        x.productId === item.productId && x.attributeId === item.attributeId
    )?.quantity;

    if (itemQuantityToUpdate) {
      item.quantity = itemQuantityToUpdate + counter;
    }

    dispatch(addOrUpdateItem(item));
  }
  return (
    <div className={classes.root}>
      {!success ? <NegativeAlert message={message || ""} /> : null}
      <Paper className={classes.paper}>
        {data && (
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <ButtonBase>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://firebasestorage.googleapis.com/v0/b/internship-august-2021-b1566.appspot.com/o/luat-tam-thuc.jpeg?alt=media&token=40221ba7-c0a2-48b9-b2d1-348f16e024c7"
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
                      value={attribute?.id ?? ""}
                      onChange={handleChange}
                      displayEmpty
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {data.attributes
                        ? data.attributes.map((attr) => (
                            <MenuItem key={attr.id} value={attr.id}>
                              {" "}
                              {attr.name}{" "}
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
                      color="secondary"
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

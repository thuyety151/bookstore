import {
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Item from "../../../model/item";
import { RootStore } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateItem } from "../../../redux/actions/cart/addOrUpdateAction";
import { getPageCart } from "../../../redux/actions/cart/getAction";
import { deleteItem } from "../../../redux/actions/cart/deleteAction";
import AddOrUpdateItem from "../../../model/AddOrUpdateItem";
import StockStatus from "../../../shared/enum/stockStatus";
import emptyCart from "../../../assets/icons/cartempty.jpg";
import { NAME_ACTIONS } from "../../../redux/constants/cart/actionTypes";
import { ROUTE_BOOK_DETAIL } from "../../../routers/types";
import { generatePath, useHistory } from "react-router-dom";

const CartTable: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state: RootStore) => state.cart);

  useEffect(() => {
    if (!data.data.length) {
      dispatch(getPageCart());
    }
  }, [dispatch, data.data.length]);

  const idItemsToCheckout = () => {
    return data.itemToCheckOut.flatMap((x) => x.id);
  };

  const handleChangeItem = (type: string, model: Item) => {
    if (type === "increase") {
      model = { ...model, quantity: model.quantity + 1 };
    } else {
      model = { ...model, quantity: model.quantity - 1 };
    }
    if (!model.quantity) {
      dispatch(deleteItem(model.id));
    } else {
      dispatch(
        addOrUpdateItem({
          productId: model.productId,
          attributeId: model.attributeId,
          quantity: model.quantity,
        } as AddOrUpdateItem)
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  const handleSetToCheckout = (item: Item) => {
    dispatch({
      type: NAME_ACTIONS.SET_ITEM_TO_CHECK_OUT.SET_ITEM_TO_CHECK_OUT,
      item,
    });
  };

  const handleViewBook = (item: Item) => {
    history.push(
      generatePath(ROUTE_BOOK_DETAIL, {
        bookId: item.id,
        attributeId: item.attributeId,
      })
    );
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell width="400">Product</TableCell>
              <TableCell width="100">Price</TableCell>
              <TableCell width="120">Quantity</TableCell>
              <TableCell width="100">Total</TableCell>
              <TableCell width="20"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.length > 0 ? (
              data.data.map((row: Item, index: number) => (
                <TableRow
                  key={index}
                  className={classes.row}
                  style={
                    row.stockStatus === StockStatus.OutOfStock
                      ? { opacity: "0.5" }
                      : {}
                  }
                >
                  <TableCell>
                    <Checkbox
                      color="primary"
                      checked={idItemsToCheckout().includes(row.id)}
                      inputProps={{ "aria-label": "secondary checkbox" }}
                      onChange={() => handleSetToCheckout(row)}
                    />
                  </TableCell>
                  <TableCell key={row.productName} component="th" scope="row">
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      onClick={() => handleViewBook(row)}
                    >
                      <img
                        className={classes.image}
                        src={row.pictureUrl}
                        alt="img"
                      />
                      <Grid>
                        <Grid>
                          <span className={classes.bookname}>
                            {row.productName}
                          </span>
                        </Grid>
                        <span className={classes.author}>{row.authorName}</span>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell className={classes.textBold}>
                    {row.price}
                  </TableCell>
                  <TableCell>
                    <Grid>
                      <OutlinedInput
                        value={row?.quantity}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              className={classes.button}
                              onClick={() => handleChangeItem("increase", row)}
                            >
                              <AddIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        startAdornment={
                          <InputAdornment position="start">
                            <IconButton
                              className={classes.button}
                              onClick={() => handleChangeItem("decrease", row)}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>
                  </TableCell>
                  <TableCell className={classes.textBold}>
                    {row.price * row.quantity}
                  </TableCell>
                  <TableCell>
                    <CloseIcon
                      className="cursor-pointer"
                      onClick={() => handleRemoveItem(row.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className={classes.row}>
                <TableCell colSpan={5} align="center">
                  <Grid item container direction="column" alignContent="center">
                    {data.requesting ? (
                      <CircularProgress disableShrink />
                    ) : (
                      <>
                        <img
                          src={emptyCart}
                          style={{ height: 300 }}
                          alt="no-data"
                        />
                        <span>Empty Cart</span>
                      </>
                    )}
                  </Grid>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 750,
    backgroundColor: "#fff",
  },
  header: {
    // fontWeight: "bold",
    fontSize: "1rem",
    padding: theme.spacing(1, 2),
    "& th": {
      fontWeight: "bold",
      fontSize: 16,
      padding: theme.spacing(3),
    },
  },
  row: {
    padding: theme.spacing(2, 0),
  },
  image: {
    // width: 200,
    objectFit: "contain",
    height: 150,
    padding: theme.spacing(2, 0),
  },
  bookname: {
    fontSize: 16,
    fontWeight: "normal",
  },
  author: {
    color: "grey",
    fontSize: 14,
  },
  textBold: {
    fontWeight: "bold",
  },
  button: {
    padding: theme.spacing(0),
  },
}));
export default CartTable;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../redux/actions/wishlist/getAction";
import { RootStore } from "../../redux/store";
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Item from "../../model/item";
import emptyCart from "../../assets/icons/cartempty.jpg";
import { useSnackbar } from "notistack";
import {
  addWLToCart,
  deleteWLItem,
} from "../../redux/actions/wishlist/postActions";
import { generatePath, useHistory } from "react-router-dom";
import { ROUTE_BOOK_DETAIL } from "../../routers/types";

const WishlistPage: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const data = useSelector((state: RootStore) => state.wishlist);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const addToCart = (itemId: string) => {
    dispatch(
      addWLToCart({
        itemId,
        onSuccess: () => {
          enqueueSnackbar("Add to cart successfully!", {
            variant: "success",
          });
          dispatch(getWishlist());
        },
        onFailure: (e) => {
          enqueueSnackbar(e, { variant: "error" });
        },
      })
    );
  };

  const onDelete = (itemId: string) => {
    dispatch(
      deleteWLItem({
        itemId,
        onSuccess: () => {
          enqueueSnackbar("Remove item was successfully!", {
            variant: "success",
          });
          dispatch(getWishlist());
        },
        onFailure: (e) => {
          enqueueSnackbar(e, { variant: "error" });
        },
      })
    );
  };
  const handleViewBook = (row: Item) => {
    history.push(
      generatePath(ROUTE_BOOK_DETAIL, {
        bookId: row.productId,
        attributeId: row.attributeId,
      })
    );
  };

  return (
    <div style={{ paddingTop: "16px" }}>
      <TableContainer component={Paper} variant="outlined">
        <Table className={classes.table}>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.length > 0 ? (
              data.data.map((row: Item, index: number) => (
                <TableRow key={index} className={classes.row}>
                  <TableCell style={{ textAlign: "center" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    key={row.productName}
                    component="th"
                    scope="row"
                    style={{ cursor: "pointer" }}
                  >
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
                      <Grid item style={{ width: "50%" }}>
                        <Grid>
                          <span className={classes.author}>
                            {row.attributeName}
                          </span>
                        </Grid>
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
                    ${row.price}
                  </TableCell>
                  <TableCell
                    className={classes.textBold}
                    style={{ textAlign: "center" }}
                  >
                    <Button onClick={() => addToCart(row.id)}>
                      ADD TO CART
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => onDelete(row.id)}>
                      <CloseIcon className="cursor-pointer" />
                    </Button>
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
                        <span>Empty Wishlist</span>
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

export default WishlistPage;

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 750,
    backgroundColor: "#fff",
  },
  header: {
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

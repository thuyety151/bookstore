import {
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
import React from "react";
import { cartItems } from "../../../mocks/cart";
import { CartItem } from "../../../model/cart";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const CartTable: React.FC = () => {
  const classes = useStyles();
  const rows = cartItems;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell width="400">Product</TableCell>
              <TableCell width="100">Price</TableCell>
              <TableCell width="120">Quantity</TableCell>
              <TableCell width="100">Total</TableCell>
              <TableCell width="20"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: CartItem, index) => (
              <TableRow key={index} className={classes.row}>
                <TableCell key={row.name} component="th" scope="row">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <img className={classes.image} src={row.imgUrl} alt="img" />
                    <Grid>
                      <Grid>
                        <span className={classes.bookname}>{row.name}</span>
                      </Grid>
                      <span className={classes.author}>{row.author}</span>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell className={classes.textBold}>{row.price}</TableCell>
                <TableCell>
                  <Grid>
                    <OutlinedInput
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton className={classes.button}>
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton className={classes.button}>
                            <RemoveIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </TableCell>
                <TableCell className={classes.textBold}>{row.total}</TableCell>
                <TableCell>
                  <CloseIcon />
                </TableCell>
              </TableRow>
            ))}
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

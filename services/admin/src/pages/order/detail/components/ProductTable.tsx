import { Avatar, Divider, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { Theme } from "@material-ui/core/styles";

import EnhancedTableHead, {
  HeadCell,
} from "components/table/EnhancedTableHead";
import Item from "model/item";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import { useParams } from "react-router";

const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
    width: "70%",
  },
  {
    id: "subTotal",
    numeric: false,
    disablePadding: true,
    label: "SubTotal",
  },
  { id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
  { id: "total", numeric: true, disablePadding: false, label: "Total" },
];

const ProductTable: React.FC = () => {
  const classes = useStyles();
  const orderState = useSelector((state: RootStore) => state.orders);
  const { orderId } = useParams() as any;

  return (
    <div>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            //   order={order}
            //   orderBy={orderBy}
            //   rowCount={orderState.data.length}
            headerCells={headCells}
            loading={orderState.requesting ? !orderId : false}
          />
          <TableBody>
            {orderState.currentOrder?.items?.map(
              (item: Item, index: number) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={item.id}
                    // onClick={() => navToDetail(row.id)}
                  >
                    <TableCell align="center" padding="checkbox">
                      <Grid container direction="row" alignItems="center">
                        <Avatar
                          variant="square"
                          src={item.pictureUrl}
                          alt={item.productName}
                          className={classes.large}
                        />
                        <Typography className="highlight-info">
                          {item.productName}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell align="center" padding="checkbox">
                      $ {item.price}
                    </TableCell>
                    <TableCell align="center" padding="checkbox">
                      x {item.quantity}
                    </TableCell>
                    <TableCell>{`$${item.price * item.quantity}`}</TableCell>
                  </TableRow>
                );
              }
            )}
            <TableRow
              hover
              tabIndex={-1}
              // onClick={() => navToDetail(row.id)}
            >
              <TableCell colSpan={4} align="center" padding="checkbox">
                <Grid container direction="row" justifyContent="flex-end">
                  <Grid item xs={4} className={classes.totalBill}>
                    <Grid item className={classes.itemInline}>
                      <Typography>Items Subtotal:</Typography>
                      <Typography>
                        {orderState.currentOrder?.subTotal}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.itemInline}>
                      <Typography>Coupon:</Typography>
                      <Typography>--</Typography>
                    </Grid>
                    <Grid item className={classes.itemInline}>
                      <Typography>Shipping:</Typography>
                      <Typography>
                        {orderState.currentOrder.orderFee}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.itemInline}>
                      <Typography>Order Total:</Typography>
                      <Typography>{orderState.currentOrder.total}</Typography>
                    </Grid>
                    <Divider className="m-x-8" />
                    <Grid item className={classes.itemInline}>
                      <Typography className="bolder">Paid:</Typography>
                      <Typography className="bolder">
                        {orderState.currentOrder?.total}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            {/*
            shouldn't remove these code !!! 
            <TableRow
              hover
              tabIndex={-1}
              // onClick={() => navToDetail(row.id)}
            >
              <TableCell colSpan={4} align="center">
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item>
                    <OutlineButton
                      text="Add new"
                      props={{
                        style: { width: "fit-content" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <ContainedButton
                      text="Recalculate"
                      props={{
                        style: { width: "fit-content" },
                      }}
                    />
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={pagination.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      {/* Dialog view detail */}
      {/* <Dialog
        open={!!modelToViewDetail}
        onClose={() => setModelToViewDetail(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Order #{modelToViewDetail?.orderCode}
        </DialogTitle>
        <Divider />
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModelToViewDetail(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary" autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    actions: {
      padding: theme.spacing(1),
      "& .MuiButton-root": {
        minWidth: "20px",
        margin: theme.spacing(0.5),
      },
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: theme.spacing(2, 0),
      "& img": {
        width: "fit-content",
      },
      "& .MuiTypography-root": {
        alignItems: "center",
      },
    },
    itemInline: {
      display: "flex",
      justifyContent: "space-between",
    },
    totalBill: {
      justifySelf: "flex-end",
      padding: theme.spacing(2, 8, 2, 2),
    },
    buttonArea: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export default ProductTable;

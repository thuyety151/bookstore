import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { rowsPerPageOptions } from "../../helper/paginationValue";
import { RootStore } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { formatFullName } from "../../helper/format";
import moment from "moment";
import OrderStatus from "../../components/orderStatus/OrderStatus";
import { generatePath, useHistory } from "react-router";
import { ROUTE_ORDER_EDIT } from "../../routers/types";
import { Order } from "../../model/order";
import { getOrderPagination } from "../../redux/actions/order/getActions";
import EnhancedTableHead, {
  HeadCell,
} from "components/table/EnhancedTableHead";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import DialogConfirm from "components/dialog/DialogConfirm";
import OrderDetailContent from "./OrderDetailContent";
import { useSnackbar } from "notistack";
import { deleteOrder } from "redux/actions/order/deleteActions";
import { cancelOrder } from "redux/actions/order/postActions";

const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "code",
    numeric: false,
    disablePadding: true,
    label: "Order",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
    width: "10%",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
    width: "10%",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
    width: "10%",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "",
    width: "15%",
  },
];

const OrderTable: React.FC<{ status: string; keywords: string }> = ({
  status,
  keywords,
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const orderState = useSelector((state: RootStore) => state.orders);
  const dispatch = useDispatch();
  const pagination = useSelector((state: RootStore) => state.orders.pagination);
  const history = useHistory();
  const [modelToDelete, setModelToDelete] = useState<string | null>(null);
  const [modelToViewDetail, setModelToViewDetail] = useState<Order | any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [confirmCancel, setconfirmCancel] = useState(false);

  useEffect(() => {
    if (keywords) {
      setPage(0);
    }
    dispatch(
      getOrderPagination({
        pagination: {
          ...pagination,
          pageSize: rowsPerPage,
          pageIndex: page + 1,
        },
        status,
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
    // eslint-disable-next-line
  }, [page, rowsPerPage, keywords]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const handleCreate = () => {
  //   history.push(ROUTE_ORDER_CREATE);
  // };
  const handleOpenDelete = (id: string) => {
    setModelToDelete(id);
  };
  const refreshTable = () => {
    dispatch(
      getOrderPagination({
        pagination: {
          ...pagination,
          pageIndex: page + 1,
          pageSize: rowsPerPage,
        },
        status,
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
  };
  const handleDeleteOrder = () => {
    dispatch(
      deleteOrder({
        id: modelToDelete || "",
        onSuccess: () => {
          enqueueSnackbar("Delete order successfully", { variant: "success" });
          setModelToDelete(null);
          setModelToViewDetail(null);
          refreshTable();
        },
        onFailure: (error) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };
  const handleOpenDetail = (item: Order) => {
    setModelToViewDetail(item);
  };

  const handleEdit = (id?: string) => {
    history.push(
      generatePath(ROUTE_ORDER_EDIT, {
        orderId: id || modelToViewDetail.id,
      })
    );
  };
  const handleSetConfirmCancel = (val: boolean) => {
    setconfirmCancel(val);
  };
  const handleCancelOrder = () => {
    dispatch(
      cancelOrder({
        order: modelToViewDetail,
        onSuccess: () => {
          setModelToViewDetail(null);
          enqueueSnackbar("Cancel order successfully!", { variant: "success" });
          setconfirmCancel(false);
          refreshTable();
        },
        onFailure: (error) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant="outlined">
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              // order={order}
              // orderBy={orderBy}
              rowCount={orderState.data.length}
              headerCells={headCells}
              loading={orderState.requesting}
            />
            <TableBody>
              {orderState.data.map((row: Order, index: number) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell align="center" padding="checkbox">
                      {index + 1}
                    </TableCell>
                    <TableCell className="primary bolder">{`#${
                      row.orderCode
                    } ${formatFullName(row.addressToShip)}`}</TableCell>
                    <TableCell>
                      {moment(new Date(row.orderDate)).format("ll")}
                    </TableCell>
                    <TableCell>
                      <OrderStatus status={row.status} />
                    </TableCell>
                    <TableCell>{`$${
                      Math.floor(row.total * 100) / 100
                    }`}</TableCell>
                    <TableCell>
                      <Button
                        className="btn-view"
                        startIcon={<Visibility />}
                        onClick={() => handleOpenDetail(row)}
                      />
                      <Button
                        className="btn-edit"
                        startIcon={<Edit />}
                        onClick={() => handleEdit(row.id)}
                      />
                      <Button
                        className="btn-delete"
                        onClick={() => handleOpenDelete(row.id)}
                        startIcon={<Delete />}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={pagination.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Dialog confirm delete */}
      <Dialog
        open={!!modelToDelete}
        onClose={() => setModelToDelete(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogConfirm
          modelId={modelToDelete}
          loading={orderState.requesting}
          title="Delete order"
          message="Are you sure you want to delete this order?"
          handleClose={() => setModelToDelete(null)}
          onConfirm={handleDeleteOrder}
        />
      </Dialog>
      {/* End dialog confirm delete */}
      {/* Dialog view detail */}
      <Dialog
        open={!!modelToViewDetail}
        onClose={() => setModelToViewDetail(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container justifyContent="space-between">
            <Grid item>Order #{modelToViewDetail?.orderCode}</Grid>
            <Grid item>
              {modelToViewDetail?.status === "Ready to pick" && (
                <Button
                  variant="outlined"
                  onClick={() => handleSetConfirmCancel(true)}
                >
                  Cancel Order
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <OrderDetailContent order={modelToViewDetail} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModelToViewDetail(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleEdit()} color="primary" autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmCancel}
        onClose={() => handleSetConfirmCancel(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cancel order ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to cancel this order ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSetConfirmCancel(false)} color="primary">
            Close
          </Button>
          <Button onClick={handleCancelOrder} color="primary" autoFocus>
            {orderState.requesting ? <CircularProgress /> : "OK"}
          </Button>
        </DialogActions>
      </Dialog>
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
    btnAddNew: {
      backgroundColor: "#e2edfe",
      color: "#639dfa",
      textTransform: "capitalize",
      minWidth: "132px",
    },
  })
);

export default OrderTable;

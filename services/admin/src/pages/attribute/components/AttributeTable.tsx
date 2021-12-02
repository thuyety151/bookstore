import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import EnhancedTableHead, {
  HeadCell,
} from "components/table/EnhancedTableHead";
import { Button, Dialog } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import DialogConfirm from "components/dialog/DialogConfirm";
import { useSnackbar } from "notistack";
import { deleteOrder } from "redux/actions/order/deleteActions";
import { RootStore } from "redux/store";
import { rowsPerPageOptions } from "helper/paginationValue";
import { Attribute } from "redux/reducers/attributeReducer";
import { getAttributePagination } from "redux/actions/attribute/getAction";

const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  // {
  //   id: "slug",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Slug",
  //   width: "10%",
  // },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "",
    width: "15%",
  },
];

const AttributeTable: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const attrState = useSelector((state: RootStore) => state.attribute);
  const dispatch = useDispatch();
  const pagination = useSelector((state: RootStore) => state.orders.pagination);
  // const history = useHistory();
  const [modelToDelete, setModelToDelete] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(
      getAttributePagination({
        pagination: {
          ...pagination,
          pageIndex: page + 1,
          pageSize: rowsPerPage,
        },
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page, rowsPerPage]);

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
  const handleOpenDelete = (id?: string) => {
    setModelToDelete(id || "");
  };
  const handleDeleteOrder = () => {
    dispatch(
      deleteOrder({
        id: modelToDelete || "",
        onSuccess: () => {
          enqueueSnackbar("Delete order successfully", { variant: "success" });
          setModelToDelete(null);
        },
        onFailure: (error) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };
  const handleOpenDetail = (item: Attribute) => {
    // setModelToViewDetail(item);
  };

  const handleEdit = (id?: string) => {
    // history.push(
    //   generatePath(ROUTE_ORDER_EDIT, {
    //     orderId: id || modelToViewDetail.id,
    //   })
    // );
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
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
              rowCount={attrState.data.length}
              headerCells={headCells}
              // loading={orderState.requesting}
            />
            <TableBody>
              {attrState.data.map((row: Attribute, index: number) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell align="center" padding="checkbox">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
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
                        onClick={() => handleOpenDelete(row?.id)}
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
          loading={attrState.requesting}
          title="Delete order"
          message="Are you sure you want to delete this order?"
          handleClose={() => setModelToDelete(null)}
          onConfirm={handleDeleteOrder}
        />
      </Dialog>
      {/* End dialog confirm delete */}
      {/* Dialog view detail */}
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

export default AttributeTable;

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
import { RootStore } from "redux/store";
import { rowsPerPageOptions } from "helper/paginationValue";
import { Category } from "redux/reducers/categoryReducer";
import { getCategoryPagination } from "redux/actions/category/getAction";
import { deleteCategory } from "redux/actions/category/postAction";
import { useSnackbar } from "notistack";
import { PUBLIC_URL } from "routers/types";
import ActionMenu from "components/table/ActionMenu";
import clsx from "clsx";

const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "image",
    numeric: false,
    disablePadding: true,
    label: "Image",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
    width: "30%",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
    width: "10%",
  },
  {
    id: "slug",
    numeric: true,
    disablePadding: false,
    label: "Slug",
    width: "20%",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: false,
    label: "Count",
    width: "5%",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "",
    width: "20%",
  },
];

export type AttributeTableProps = {
  setModelEdit: any;
};

const CategoryTable: React.FC<AttributeTableProps> = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const cateState = useSelector((state: RootStore) => state.categories);
  const dispatch = useDispatch();
  const { pagination, success } = useSelector(
    (state: RootStore) => state.categories
  );
  // const history = useHistory();
  const [modelToDelete, setModelToDelete] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (success) {
      props.setModelEdit(null);
      dispatch(
        getCategoryPagination({
          pagination: {
            ...pagination,
            pageIndex: page + 1,
            pageSize: rowsPerPage,
          },
          onSuccess: () => {},
          onFailure: (error) => {
            enqueueSnackbar(error, { variant: "error" });
          },
        })
      );
    }
    //eslint-disable-next-line
  }, [success]);

  useEffect(() => {
    dispatch(
      getCategoryPagination({
        pagination: {
          ...pagination,
          pageIndex: page + 1,
          pageSize: rowsPerPage,
        },
        onSuccess: () => {},
        onFailure: (error) => {
          enqueueSnackbar(error, { variant: "error" });
        },
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

  const handleOpenDelete = (id?: string) => {
    setModelToDelete(id || "");
  };

  const handleOpenDetail = (id: string) => {
    window.open(PUBLIC_URL.CATEGORY + id);
  };

  const handleEdit = (model: Category) => {
    props.setModelEdit(model);
    // history.push(
    //   generatePath(ROUTE_ORDER_EDIT, {
    //     orderId: id || modelToViewDetail.id,
    //   })
    // );
  };
  const handleDelete = () => {
    dispatch(
      deleteCategory({
        id: modelToDelete || "",
        onSuccess: () => {
          enqueueSnackbar("Delete category successfully", {
            variant: "success",
          });
          setModelToDelete(null);
          dispatch(
            getCategoryPagination({
              pagination: {
                ...pagination,
                pageIndex: page + 1,
                pageSize: rowsPerPage,
              },
              onSuccess: () => {},
              onFailure: () => {},
            })
          );
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, {
            variant: "error",
          });
        },
      })
    );
  };
  return (
    <div className={clsx(classes.root, "pr-lg")}>
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
              rowCount={cateState.data.length}
              headerCells={headCells}
              loading={cateState.requesting}
            />
            <TableBody>
              {cateState.data?.map((row: Category, index: number) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell align="center" padding="checkbox">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <img
                        src={
                          row.mediaUrl ||
                          "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638976103/cjndkz21bnu9fyw82sao.png"
                        }
                        alt="media"
                        style={{ width: "50px" }}
                      />
                    </TableCell>
                    <TableCell className="bolder">{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.slug}</TableCell>
                    <TableCell>{row.count}</TableCell>
                    {/* <TableCell>
                      <ActionMenu />
                    </TableCell> */}
                    <TableCell>
                      <Button
                        className="btn-view"
                        startIcon={<Visibility />}
                        onClick={() => handleOpenDetail(row.id)}
                      />
                      <Button
                        className="btn-edit"
                        startIcon={<Edit />}
                        onClick={() => handleEdit(row)}
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
      {modelToDelete && (
        <DialogConfirm
          modelId={modelToDelete}
          loading={cateState.requesting}
          title="Delete order"
          message="Are you sure you want to delete this order?"
          handleClose={() => setModelToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
      {/* <Dialog
        open={!!modelToDelete}
        onClose={() => setModelToDelete(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogConfirm
          modelId={modelToDelete}
          loading={cateState.requesting}
          title="Delete order"
          message="Are you sure you want to delete this order?"
          handleClose={() => setModelToDelete(null)}
          onConfirm={handleDelete}
        />
      </Dialog> */}
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

export default CategoryTable;

import {
  Button,
  createStyles,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Theme,
} from "@material-ui/core";
import EnhancedTableHead from "components/table/EnhancedTableHead";
import { rowsPerPageOptions } from "helper/paginationValue";
import { Book } from "model/book";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useHistory } from "react-router-dom";
import { getProductDetail, getProductPagination } from "redux/actions/product/getActions";
import { RootStore } from "redux/store";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { ROUTE_PRODUCT_DETAIL } from "routers/types";

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

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
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "stockStatus",
    numeric: false,
    disablePadding: true,
    label: "Stock Status",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: true,
    label: "Price",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: true,
    label: "Category",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Publish Date",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "",
  },
];
export default function ProductTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const pagination = useSelector((state: RootStore) => state.books.pagination);
  const booksState = useSelector((state: RootStore) => state.books);

  // const [page, setPage] = React.useState(0);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    dispatch(
      getProductPagination({
        pagination: {
          ...pagination,
          pageIndex: pageIndex + 1,
          pageSize: rowsPerPage,
        },
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
    // eslint-disable-next-line
  }, [dispatch, pageIndex, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageIndex(0);
  };

  const navToEdit = (bookId : string) => {
    dispatch(getProductDetail({
      id: bookId,
      onSuccess: () => {},
      onFailure: () => {}
    }));
    history.push(
      generatePath(ROUTE_PRODUCT_DETAIL, {
        bookId: bookId,
      })
    );
  }

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
              rowCount={booksState.data.length}
              headerCells={headCells}
              loading={booksState.requesting}
            />
            <TableBody>
              {booksState.data.map((row: Book, index: number) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    //onClick={() => navToDetail(row.id)}
                  >
                    <TableCell align="center" padding="checkbox">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <img
                        src={row.pictureUrl}
                        alt="book"
                        className={classes.img}
                      ></img>
                    </TableCell>
                    <TableCell className="primary bolder">{row.name}</TableCell>
                    <TableCell className={classes.stock}>
                      {row.stockStatus}
                    </TableCell>
                    <TableCell className={classes.price}>
                      ${row.price}
                    </TableCell>
                    <TableCell>{row.categories}</TableCell>
                    <TableCell>
                      {moment(new Date(row.publishDate)).format("ll")}
                    </TableCell>
                    <TableCell align="right" className={classes.actions}>
                      <Button
                        style={{
                          backgroundColor: "#f0f0f5",
                          color: "#a2a2a8",
                        }}
                        startIcon={<VisibilityIcon />}
                      />
                      <Button
                        style={{
                          backgroundColor: "#e2edfe",
                          color: "#639dfa",
                        }}
                        startIcon={<EditIcon />}
                        onClick={() => navToEdit(row.id)}
                      />
                      <Button
                        style={{
                          backgroundColor: "#faded7",
                          color: "#e13610",
                        }}
                        startIcon={<DeleteIcon />}
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
          page={pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

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
    img: {
      height: "40px",
    },
    stock: {
      fontWeight: "bold",
      color: "#32CD32",
    },
    price: {
      fontWeight: "bold",
    },
  })
);

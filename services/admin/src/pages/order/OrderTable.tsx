import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { rowsPerPageOptions } from "../../helper/paginationValue";
import { RootStore } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { formatFullName } from "../../helper/format";
import moment from "moment";
import OrderStatus from "../../components/orderStatus/OrderStatus";
import { generatePath, useHistory } from "react-router";
import { ROUTE_ORDER_DETAIL } from "../../routers/types";
import { Order } from "../../model/order";
import { getOrderPagination } from "../../redux/actions/order/getActions";

interface Data {
  id: string;
  code: string;
  date: string;
  status: string;
  total: string;
}

type OrderTableType = "asc" | "desc";
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
    id: "code",
    numeric: false,
    disablePadding: true,
    label: "Order",
  },
  { id: "date", numeric: true, disablePadding: false, label: "Date" },
  { id: "status", numeric: true, disablePadding: false, label: "Status" },
  { id: "total", numeric: true, disablePadding: false, label: "Total" },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected?: number;
  onRequestSort?: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: OrderTableType;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            className="primary"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              //   onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const OrderTable: React.FC = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<OrderTableType>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const orderState = useSelector((state: RootStore) => state.orders);
  const dispatch = useDispatch();
  const pagination = useSelector((state: RootStore) => state.orders.pagination);
  const history = useHistory();

  useEffect(() => {
    dispatch(
      getOrderPagination({
        pagination,
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
  }, [dispatch]);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navToDetail = (orderId: string) => {
    history.push(
      generatePath(ROUTE_ORDER_DETAIL, {
        orderId: orderId,
      })
    );
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
              order={order}
              orderBy={orderBy}
              rowCount={orderState.data.length}
            />
            <TableBody>
              {orderState.data.map((row: Order, index: number) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => navToDetail(row.id)}
                  >
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
                    <TableCell>{`$${row.total}`}</TableCell>
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
  })
);

export default OrderTable;

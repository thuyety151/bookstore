import React, { useEffect } from "react";
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
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { RootStore } from "redux/store";
import { rowsPerPageOptions } from "helper/paginationValue";
import { getAllAdmin } from "redux/actions/noti/getActions";
import { Notification } from "../../redux/reducers/notiReducer";
import { Visibility } from "@material-ui/icons";
import { format } from "date-fns";
import CloseIcon from "@material-ui/icons/Close";

const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "#",
    width: "10%",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
    width: "40%",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: false,
    label: "Count ( Users )",
    width: "20%",
  },
  {
    id: "created_At",
    numeric: true,
    disablePadding: false,
    label: "Created At",
    width: "20%",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "",
    width: "25%",
  },
];

const NotiTable: React.FC = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { requesting, data, pagination } = useSelector(
    (state: RootStore) => state.notis.admin
  );
  const dispatch = useDispatch();
  const [modelDetail, setModelDetail] = React.useState<Notification | null>(
    null
  );

  useEffect(() => {
    dispatch(
      getAllAdmin({
        ...pagination,
        pageIndex: page + 1,
        pageSize: rowsPerPage,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
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
              rowCount={data.length}
              headerCells={headCells}
              loading={requesting}
            />
            <TableBody>
              {data?.map((row: Notification, index: number) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell align="center" padding="checkbox">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.metadata.title}</TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>
                      {format(new Date(row.createdDate), "HH:mm dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="btn-view"
                        startIcon={<Visibility />}
                        onClick={() => setModelDetail(row)}
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
      {/* Dialog view detail */}
      <Dialog
        fullScreen
        open={!!modelDetail}
        onClose={() => setModelDetail(null)}
        style={{ display: "flex", justifyContent: "end", width: "100%" }}
      >
        <Paper style={{ width: "40vw" }} elevation={0}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                style={{ color: "#000" }}
                onClick={() => setModelDetail(null)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Notification
              </Typography>
            </Toolbar>
          </AppBar>
          <Divider />
          <Grid container className={classes.form}>
            <Grid container justifyContent="space-between">
              <Typography>Title:</Typography>
              <Typography>{modelDetail?.metadata?.title}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Contents:</Typography>
              <Typography>{modelDetail?.metadata?.body?.contents}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Users:</Typography>
              <Typography>{modelDetail?.count}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Created At:</Typography>
              <Typography>
                {modelDetail?.createdDate &&
                  format(
                    new Date(modelDetail?.createdDate),
                    "HH:mm dd/MM/yyyy"
                  )}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
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
    appBar: {
      position: "relative",
      backgroundColor: "#fff",
      "& .MuiPaper-elevation4": {
        boxShadow: "none",
      },
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: "#000",
    },
    form: {
      padding: theme.spacing(4),
      gap: 8,
    },
  })
);

export default NotiTable;

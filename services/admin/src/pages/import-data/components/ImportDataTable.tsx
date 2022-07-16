import React, { ReactElement, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import EnhancedTableHead, {
  HeadCell,
} from "components/table/EnhancedTableHead";
import { Backdrop, Button, CircularProgress } from "@material-ui/core";
import { RootStore } from "redux/store";
import { rowsPerPageOptions } from "helper/paginationValue";
import { format } from "date-fns";
import { getImportDataPagination } from "redux/actions/importData/getAction";
import { Media } from "model/media";
import EnhancedTableBody from "components/table/EnhancedTableBody";

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
  {
    id: "datetime",
    numeric: false,
    disablePadding: false,
    label: "Date Time",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Download",
  },
];

const sampleData = [
  {
    id: "1",
    name: "Import Books 15/02/2022",
    datetime: format(new Date(), "HH:mm dd/MM/yyyy"),
    status: true,
  },
  {
    id: "1ad",
    name: "Import Books 25/02/2022",
    datetime: format(new Date(), "HH:mm dd/MM/yyyy"),
    status: false,
  },
  {
    id: "1ad",
    name: "Import Books 25/02/2022",
    datetime: format(new Date(), "HH:mm dd/MM/yyyy"),
    status: true,
  },
];

const ImportDataTable: React.FC<{ keywords: string }> = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const state = useSelector((state: RootStore) => state.importData);
  const dispatch = useDispatch();
  const { pagination } = useSelector((state: RootStore) => state.importData);

  useEffect(() => {
    if (state.success) {
      dispatch(
        getImportDataPagination({
          pagination: {
            ...pagination,
            pageIndex: page + 1,
            pageSize: rowsPerPage,
          },
          keywords: props.keywords,
          onSuccess: () => {},
          onFailure: () => {},
        })
      );
    }
    // eslint-disable-next-line
  }, [state.success]);

  useEffect(() => {
    if (state.create.requesting) {
      return;
    }

    dispatch(
      getImportDataPagination({
        pagination: {
          ...pagination,
          pageIndex: page + 1,
          pageSize: rowsPerPage,
        },
        keywords: props.keywords,
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page, rowsPerPage, state.create.requesting, props.keywords]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={state.create.requesting}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
              rowCount={sampleData.length}
              headerCells={headCells}
              loading={state.requesting}
            />
            <EnhancedTableBody
              loading={state.requesting}
              length={state.data.length}
            >
              <>
                {state.data?.map((row: Media, index: number) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`import-data-${index}`}>
                      <TableCell align="center" padding="checkbox">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        {row.createdAt &&
                          format(new Date(row.createdAt), "HH:mm dd/MM/yyyy")}
                      </TableCell>
                      <TableCell
                        className={
                          row.isSuccess ? classes.success : classes.failed
                        }
                      >
                        {row.isSuccess ? "Success" : "Failed"}
                      </TableCell>
                      <TableCell>{row.description || "--"}</TableCell>
                      <TableCell
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button variant="outlined" href={row.url}>
                          <span className="material-icons-outlined px-lg">
                            file_download
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) as ReactElement;
                })}
              </>
            </EnhancedTableBody>
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
      "&.success": {
        color: "red",
      },
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
    success: {
      color: "#33b650",
      fontWeight: 600,
    },
    failed: {
      color: "#de2c00",
      fontWeight: 600,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default ImportDataTable;

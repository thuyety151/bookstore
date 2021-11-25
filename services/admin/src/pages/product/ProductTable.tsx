import { createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Theme } from "@material-ui/core";
import EnhancedTableHead from "components/table/EnhancedTableHead";
import React from "react";

export default function ProductTable (){
    const classes = useStyles();
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
            {/* <EnhancedTableHead
              classes={classes}
              // order={order}
              // orderBy={orderBy}
              //rowCount={orderState.data.length}
              //headerCells={headCells}
             // loading={orderState.requesting}
            /> */}
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
    )
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root : {
            width: "100%",
        },
        paper: {
            width: "100%",
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750
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
              }
          }
        
    })
)
import {
  Typography,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import EnhancedTableHead, {
  HeadCell,
} from "components/table/EnhancedTableHead";
import Item from "model/item";
import { Order } from "model/order";

type Props = {
  order: Order | any;
};

const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Product",
    width: "70%",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
    width: "20%",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
    width: "10%",
  },
];

const OrderDetailContent: React.FC<Props> = (props) => {
  const { streetAddress, wardName, districtName, provinceName, phone } =
    props.order?.addressToShip || "";
  const { order } = props;

  return (
    <div>
      <Grid container direction="column">
        <Typography className="bolder">Billing details</Typography>
        {[streetAddress, wardName, districtName, provinceName]?.map(
          (item, index: number) => {
            return (
              <Typography key={`content-${index}`} className="text-gray">
                {item}
              </Typography>
            );
          }
        )}
        <hr />
        <Typography className="bolder">Phone</Typography>
        <Typography className="bolder">{phone}</Typography>
        <Grid container>
          <TableContainer>
            <Table
              // className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                //   order={order}
                //   orderBy={orderBy}
                //   rowCount={orderState.data.length}
                headerCells={headCells}
                loading={false}
              />
              <TableBody>
                {order?.items?.map((item: Item, index: number) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={`item-${index}`}
                      // onClick={() => navToDetail(row.id)}
                    >
                      <TableCell align="center" padding="checkbox">
                        <Grid container direction="row">
                          <Typography>{item.productName}</Typography>
                        </Grid>
                      </TableCell>
                      <TableCell align="center" padding="checkbox">
                        {item.quantity}
                      </TableCell>
                      <TableCell>{`$${item.price * item.quantity}`}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetailContent;

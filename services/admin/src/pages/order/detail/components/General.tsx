import {
  Theme,
  createStyles,
  makeStyles,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../../redux/store";
import { format } from "date-fns";
import { orderStatusOptions } from "../../../../components/orderStatus/OrderStatus";
import { cancelOrder } from "redux/actions/order/postActions";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

const General: React.FC = () => {
  const classes = useStyles();
  const order = useSelector((state: RootStore) => state.orders.currentOrder);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setstatus] = useState(order.status || "");

  useEffect(() => {
    if (order.status) {
      setstatus(order.status);
    }
  }, [order.status]);

  const handleChange = (val: any) => {
    if (val.target.value !== "Cancel") {
      return;
    }
    dispatch(
      cancelOrder({
        order: order,
        onSuccess: () => {
          setstatus("Cancel");
          enqueueSnackbar("Cancel order successfully!", {
            variant: "success",
          });
        },
        onFailure: (error) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };
  return (
    <Grid>
      <Typography className="bolder">General</Typography>
      <br />
      <Typography className="text-gray">Date created:</Typography>
      <Grid item container>
        <TextField
          variant="outlined"
          size="small"
          value={
            order.orderDate
              ? format(new Date(order.orderDate), "yyyy-MM-dd")
              : "--"
          }
          disabled
        />
        <Typography>@</Typography>
        <TextField
          className={classes.smallInput}
          variant="outlined"
          size="small"
          value={
            order.orderDate ? format(new Date(order.orderDate), "HH") : "--"
          }
          disabled
        />
        <Typography>:</Typography>
        <TextField
          className={classes.smallInput}
          variant="outlined"
          size="small"
          value={
            order.orderDate ? format(new Date(order.orderDate), "mm") : "--"
          }
          disabled
        />
      </Grid>
      <Typography className="text-gray">Status</Typography>
      <FormControl
        variant="outlined"
        size="small"
        className={classes.formControl}
      >
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={status}
          key={status || "status"}
          onChange={(e) => handleChange(e)}
          disabled={status === "Cancel"}
          style={{ width: "15rem" }}
          autoWidth
        >
          {orderStatusOptions.map((status, index) => {
            return (
              <MenuItem key={`option-${index}`} value={status}>
                {status}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {/* <Typography className="text-gray">Customer:</Typography> */}
      {/* <FormControl
        variant="outlined"
        size="small"
        className={classes.formControl}
      >
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          // value={age}
          // onChange={handleChange}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    actionsContainer: {},
    title: {
      padding: theme.spacing(2, 0),
    },
    container: {},
    header: {},
    smallInput: {
      "& .MuiInputBase-input": {
        width: "5rem",
      },
    },
    formControl: {
      margin: theme.spacing(1, 0),
      minWidth: 120,
    },
  })
);

export default General;

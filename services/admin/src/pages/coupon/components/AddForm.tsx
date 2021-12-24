import {
  createStyles,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import VInput from "components/form/VInput";
import React, { useState } from "react";
import { ValidationName } from "helper/useValidator";
import ContainedButton from "components/button/ContainedButton";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { RootStore } from "redux/store";
import { Coupon } from "redux/reducers/couponReducer";
import { upsertCoupon } from "redux/actions/coupon/postAction";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { get } from "lodash";

export enum DisCountType {
  FixedCart,
  Percentage,
}
export type AddFormProps = {
  model?: Coupon | null;
};
const AddForm: React.FC<AddFormProps> = (props) => {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const getInitForm = (): Coupon => ({
    id: props.model?.id || "",
    code: props.model?.code || "",
    description: props.model?.description || "",
    couponAmount: props.model?.couponAmount || 0,
    discountType: props.model?.discountType || DisCountType.FixedCart,
    expireDate: props.model?.expireDate || new Date(),
  });
  const [formValue, setFormValue] = useState<Coupon>(getInitForm());
  const dispatch = useDispatch();
  const { resquesting } = useSelector((state: RootStore) => state.media);
  const { enqueueSnackbar } = useSnackbar();

  const handleDateChange = (date: Date | null) => {
    setFormValue({
      ...formValue,
      expireDate: date,
    });
  };

  const handleChange = (key: string) => (event: any) => {
    setIsSubmit(false);
    if (key === "couponAmount") {
      setFormValue({
        ...formValue,
        couponAmount: Number(event.target.value),
      });
      return;
    }
    setFormValue({
      ...formValue,
      [key]: event.target.value,
    });
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    /**
     *  handle data again
     */
    console.log("form value:" + JSON.stringify(formValue));
    const x = ["code"].map((key: string) => {
      return !!get(formValue, key); // false is invalid
    });

    if (x.includes(false)) {
      console.log("xx");
      return;
    }

    /**
     *  integrate api
     */
    dispatch(
      upsertCoupon({
        data: formValue,
        onSuccess: () => {
          setIsSubmit(false);
          enqueueSnackbar(
            formValue.id
              ? "Update coupon successfully"
              : "Create new coupon successfully!",
            {
              variant: "success",
            }
          );
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid>
          {!props.model && (
            <Typography className="bolder">Add new coupon</Typography>
          )}
          <br />
          <Typography>Code</Typography>
          <VInput
            value={formValue.code}
            onChange={handleChange("code")}
            margin="dense"
            inputRef={(input) => {
              if (input != null && isSubmit) {
                input.focus();
                input.blur();
              }
            }}
            rules={[ValidationName.Required]}
          />
          <br />
          <Typography>Description</Typography>
          <TextField
            variant="outlined"
            value={formValue.description}
            multiline
            onChange={handleChange("description")}
            margin="dense"
          />
          <br />
          <Typography>Coupon Amount</Typography>
          <TextField
            variant="outlined"
            value={formValue.couponAmount}
            onChange={handleChange("couponAmount")}
            margin="dense"
            type="number"
            required
          />
          <br />
          <Typography>Discount Type</Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formValue.discountType}
            onChange={handleChange("discountType")}
          >
            <MenuItem value={DisCountType.FixedCart}>Fixed Cart</MenuItem>
            <MenuItem value={DisCountType.Percentage}>Percentage</MenuItem>
          </Select>
          <br />
          <Typography>Exprie Date</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={
                  formValue.expireDate === null
                    ? new Date()
                    : new Date(formValue.expireDate)
                }
                onChange={(date) => handleDateChange(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <br />
          <ContainedButton
            text={props.model ? "Save" : "Add coupon"}
            style={{
              width: "fit-content",
            }}
            disabled={resquesting}
            onClick={() => handleSubmit()}
          />
        </Grid>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiFormControl-root": {
        width: "100%",
      },
    },
    actionsContainer: {},
    title: {
      padding: theme.spacing(2, 0),
    },
    paper: {
      padding: "20px 20px",
    },
  })
);

export default AddForm;

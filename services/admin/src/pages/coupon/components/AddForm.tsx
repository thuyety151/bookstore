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
import React, { useEffect, useState } from "react";
import { ValidationName } from "helper/useValidator";
import ContainedButton from "components/button/ContainedButton";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Category } from "redux/reducers/categoryReducer";
import ProductImage from "pages/product/detail/components/ProductImage";
import { getListParent } from "redux/actions/category/getAction";
import { upsertCategory } from "redux/actions/category/postAction";
import { Media } from "model/media";
import { RootStore } from "redux/store";
import { Coupon } from "redux/reducers/couponReducer";
import { format } from "date-fns";
import { upsertCoupon } from "redux/actions/coupon/postAction";

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
    discountType: props.model?.discountType || "",
    expireDate: props.model?.expireDate || new Date(Date.now.toString()),
  });
  const [formValue, setFormValue] = useState<Coupon>(getInitForm());
  const dispatch = useDispatch();
  const { resquesting } = useSelector((state: RootStore) => state.media);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (key: string) => (event: any) => {
    setIsSubmit(false);

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
    const x = ["name"].map((key: string) => {
      return !!get(formValue, key); // false is invalid
    });

    if (x.includes(false)) {
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
            multiline
            onChange={handleChange("couponAmount")}
            margin="dense"
          />
          <br />
          <Typography>Discount Type</Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={
              formValue.discountType === "Percentage"
                ? DisCountType.Percentage
                : DisCountType.FixedCart
            }
            onChange={handleChange("discountType")}
          >
            <MenuItem value={DisCountType.FixedCart}>Fixed Cart</MenuItem>
            <MenuItem value={DisCountType.Percentage}>Percentent</MenuItem>
          </Select>
          <br />
          <ContainedButton
            text={props.model ? "Save" : "Add coupon"}
            props={{
              style: {
                width: "fit-content",
              },
              disabled: resquesting,
              onClick: () => handleSubmit(),
            }}
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
        padding: "20px 20px"
    }
  })
);

export default AddForm;

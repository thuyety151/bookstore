import React from "react";
import {
  Grid,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Theme,
  createStyles,
  makeStyles,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from "@material-ui/core";
import AddressForm from "../../../../components/address/AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../../redux/store";
import { createAddress } from "../../../../redux/actions/address/postAction";
import { AddressFormSchema } from "../../../../model/address";

const CreateAddressForm: React.FC = () => {
  const getInitValue = (): AddressFormSchema => ({
    firstName: "",
    lastName: "",
    province: {
      id: 0,
      name: "",
    },
    district: {
      id: 0,
      name: "",
    },
    ward: {
      id: 0,
      name: "",
    },
    street: "",
    isDefault: false,
  });
  const dispatch = useDispatch();
  const [formValue, setFormValue] = React.useState<AddressFormSchema>(
    getInitValue()
  );
  const classes = useStyles();
  const loading = useSelector((state: RootStore) => state.address.requesting);
  const handleCreateAddress = () => {
    dispatch(
      createAddress({
        value: formValue as AddressFormSchema,
        onSuccess: () => {
          console.log("success created");
        },
      })
    );
  };
  return (
    <Grid item container xs={12}>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={6}>
          <InputLabel htmlFor="outlined-age-native-simple">
            First name
          </InputLabel>
          <OutlinedInput
            value={formValue.firstName}
            onChange={(e) =>
              setFormValue({
                ...formValue,
                firstName: e.target.value as string,
              })
            }
            inputProps={{ "aria-label": "naked" }}
            // onBlur={() => setTouched({ ...touched, street: true })}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Last name
          </InputLabel>
          <OutlinedInput
            value={formValue.lastName}
            onChange={(e) =>
              setFormValue({
                ...formValue,
                lastName: e.target.value as string,
              })
            }
            inputProps={{ "aria-label": "naked" }}
            // onBlur={() => setTouched({ ...touched, street: true })}
          />
        </Grid>
      </Grid>
      <AddressForm formValue={formValue} setFormValue={setFormValue} />
      <FormControlLabel
        control={
          <Checkbox
            checked={formValue.isDefault}
            onChange={(e) =>
              setFormValue({
                ...formValue,
                isDefault: !formValue.isDefault,
              })
            }
          />
        }
        label="Default"
      />
      <Grid item container justifyContent="flex-end">
        <Button
          className={classes.nevBtn}
          // onClick={() => setIsChangeAddress(false)}
        >
          Cancel
        </Button>
        <Button
          className={classes.posBtn}
          // type="submit"
          onClick={handleCreateAddress}
        >
          {loading ? (
            <CircularProgress
              size={26}
              color="inherit"
              style={{ color: "#fff" }}
            />
          ) : (
            <Typography>Create</Typography>
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#fff6f6!important",
      minHeight: "100vh",
    },
    checkout: {
      "& button": {
        margin: 0,
      },
    },
    title: {
      padding: "48px",
    },
    dialog: {
      "& .MuiDialog-paper": {
        margin: 0,
        width: "40%",
        maxWidth: "100vw",
        padding: theme.spacing(4),
      },
      "& .MuiOutlinedInput-root": {
        width: "100%",
      },
      "& .MuiInputLabel-root": {
        fontWeight: 500,
        fontSize: 16,
        color: "#000",
        margin: theme.spacing(1, 0),
      },
      "& button": {
        padding: theme.spacing(1, 4),
      },
    },
    actions: {
      padding: theme.spacing(0, 3, 2),
    },
    posBtn: {
      padding: theme.spacing(1, 2),
      backgroundColor: "#000",
      color: "#fff",
      margin: theme.spacing(1, 1),
      border: "2px solid #000",
      "&:hover": {
        backgroundColor: "#000",
        color: "#fff",
      },
    },
    nevBtn: {
      padding: theme.spacing(1, 2),
      color: "#000",
      border: "2px solid #000",
      margin: theme.spacing(1, 1),
    },
  })
);

export default CreateAddressForm;
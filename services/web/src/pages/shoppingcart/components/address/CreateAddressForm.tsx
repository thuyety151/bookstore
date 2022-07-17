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
import {
  createAddress,
  updateAddress,
} from "../../../../redux/actions/address/postAction";
import { Address, AddressFormSchema } from "../../../../model/address";
import { getAllAddresses } from "../../../../redux/actions/address/getAction";
import { useSnackbar } from "notistack";
import { vnf_regex } from "../../../../helper/validator";

const CreateAddressForm: React.FC<{
  onClose: () => void;
  address?: Address;
}> = ({ onClose, address }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const getInitValue = (): AddressFormSchema => ({
    id: address?.id,
    firstName: address?.firstName || "",
    lastName: address?.lastName || "",
    phoneNumber: address?.phone || "",
    apartmentNumber: address?.apartmentNumber || "",
    province: {
      id: address?.provinceId || 0,
      name: address?.provinceName || "",
      code: "",
    },
    district: {
      id: address?.districtId || 0,
      name: address?.districtName || "",
      code: "",
    },
    ward: {
      id: 0,
      name: address?.wardName || "",
      code: address?.wardCode || "",
    },
    street: address?.streetAddress || "",
    isDefault: address?.isMain || false,
  });
  const [formValue, setFormValue] = React.useState<AddressFormSchema>(
    getInitValue()
  );
  const loading = useSelector((state: RootStore) => state.address.requesting);

  const handleCreateAddress = () => {
    if (
      ["firstName", "lastName", "phoneNumber", "apartmentNumber"]
        .map((key: string) =>
          Boolean(formValue[key as keyof AddressFormSchema])
        )
        .filter((x: any) => !x).length ||
      !formValue.district.name ||
      !formValue.ward.name ||
      !formValue.province.name
    ) {
      enqueueSnackbar("Please fill out the form", { variant: "error" });
      return;
    }

    if (!vnf_regex.test(formValue?.phoneNumber)) {
      enqueueSnackbar("Phone number is not valid", { variant: "error" });
      return;
    }

    if (formValue.id) {
      //update
      dispatch(
        updateAddress({
          value: formValue as AddressFormSchema,
          onSuccess: () => {
            dispatch(getAllAddresses());
            onClose();
          },
          onFailure: (error: any) => {
            enqueueSnackbar(error, { variant: "error" });
          },
        })
      );
    } else {
      dispatch(
        createAddress({
          value: formValue as AddressFormSchema,
          onSuccess: () => {
            dispatch(getAllAddresses());
            onClose();
          },
          onFailure: (error: any) => {
            enqueueSnackbar(error, { variant: "error" });
          },
        })
      );
    }
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
      <Grid item container>
        <Grid item xs={12}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Phone number
          </InputLabel>
          <OutlinedInput
            value={formValue.phoneNumber}
            onChange={(e) =>
              setFormValue({
                ...formValue,
                phoneNumber: e.target.value as string,
              })
            }
            inputProps={{ "aria-label": "naked" }}
            // onBlur={() => setTouched({ ...touched, street: true })}
          />
        </Grid>
      </Grid>
      <AddressForm formValue={formValue} setFormValue={setFormValue} />
      <Grid item container>
        <Grid item xs={12}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Apartment number
          </InputLabel>
          <OutlinedInput
            value={formValue.apartmentNumber}
            onChange={(e) =>
              setFormValue({
                ...formValue,
                apartmentNumber: e.target.value as string,
              })
            }
            inputProps={{ "aria-label": "naked" }}
            // onBlur={() => setTouched({ ...touched, street: true })}
          />
        </Grid>
      </Grid>
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
        <Button className={classes.nevBtn} onClick={onClose}>
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
            <Typography>{formValue.id ? "Update" : "Create"}</Typography>
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

import {
  Grid,
  Select,
  InputLabel,
  makeStyles,
  Theme,
  FormGroup,
  createStyles,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDistrict,
  getProvince,
  getWard,
} from "../../redux/actions/address/getAction";
import { RootStore } from "../../redux/store";
import { get, capitalize } from "lodash";
import { AddressFormSchema } from "../../pages/shoppingcart/ShoppingCartPage";

interface Props {
  formValue: AddressFormSchema;
  setFormValue: React.Dispatch<React.SetStateAction<AddressFormSchema>>;
}
const AddressForm: React.FC<Props> = ({ formValue, setFormValue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sampleAddress = useSelector((state: RootStore) => state.address.data);
  useEffect(() => {
    if (sampleAddress.province?.length === 0) {
      dispatch(getProvince());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getDistrict(formValue.province.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue.province.id]);
  useEffect(() => {
    dispatch(getWard(formValue.district.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue.district.id]);
  const [touched, setTouched] = useState({
    province: false,
    district: false,
    ward: false,
    street: false,
  });

  const handleChangeForm =
    (key: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
      //sampleAddress.province[index]
      const data = get(
        sampleAddress,
        `${key}[${event.target.value as number}]`
      );
      setFormValue({
        ...formValue,
        [key]: {
          id:
            data[`${capitalize(key)}ID`] || data[`${capitalize(key)}Code`] || 0, //data.ProvinceID
          name: data[`${capitalize(key)}Name`],
        },
      });
    };
  const validator = (key: string) => {
    if (get(touched, key) && !get(formValue, `${key}.id`)) {
      return { error: true, msg: "This field is required" };
    }
    return { error: false, msg: "" };
  };

  return (
    <div style={{ width: "100%" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <FormGroup className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Province/City
          </InputLabel>
          <Select
            native
            variant="outlined"
            value={formValue.province.name}
            onChange={handleChangeForm("province")}
            placeholder="hihi"
            error={validator("province").error}
            onBlur={() => setTouched({ ...touched, province: true })}
          >
            {sampleAddress.province.map((item: any, index: number) => {
              return (
                <option key={item.ProvinceID} value={index}>
                  {item.NameExtension[1]}
                </option>
              );
            })}
          </Select>
          {validator("province").error && (
            <FormHelperText className="text-error">
              {validator("province").msg}
            </FormHelperText>
          )}
          <InputLabel htmlFor="outlined-age-native-simple">District</InputLabel>
          <Select
            native
            variant="outlined"
            value={formValue.district.name}
            onChange={handleChangeForm("district")}
            onBlur={() => setTouched({ ...touched, district: true })}
            displayEmpty
          >
            {sampleAddress.district.map((item: any, index: number) => {
              return (
                <option key={item.DistrictID} value={index}>
                  {item.NameExtension[0]}
                </option>
              );
            })}
          </Select>
          {validator("district").error && (
            <FormHelperText className="text-error">
              {validator("district").msg}
            </FormHelperText>
          )}
          <InputLabel htmlFor="outlined-age-native-simple">
            Ward/Commune
          </InputLabel>
          <Select
            native
            variant="outlined"
            value={formValue.ward.id}
            onChange={handleChangeForm("ward")}
            error={validator("ward").error}
            onBlur={() => setTouched({ ...touched, ward: true })}
          >
            {sampleAddress.ward.map((item: any, index: number) => {
              return (
                <option key={item.WardCode} value={index}>
                  {item.WardName}
                </option>
              );
            })}
          </Select>
          {validator("ward").error && (
            <FormHelperText className="text-error">
              {validator("ward").msg}
            </FormHelperText>
          )}
          <InputLabel htmlFor="outlined-age-native-simple">
            Street address
          </InputLabel>
          <OutlinedInput
            placeholder="House number and street name"
            value={formValue.street}
            onChange={(e) =>
              setFormValue({ ...formValue, street: e.target.value as string })
            }
            inputProps={{ "aria-label": "naked" }}
            onBlur={() => setTouched({ ...touched, street: true })}
          />
        </FormGroup>
      </Grid>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      // minWidth: "100%",
      width: "100%",
      "& option": {
        padding: theme.spacing(2),
      },
      "& .MuiInputLabel-root": {
        fontWeight: 500,
        fontSize: 16,
        color: "#000",
        margin: theme.spacing(1, 0),
      },
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);
export default AddressForm;

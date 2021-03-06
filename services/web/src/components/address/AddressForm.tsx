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
  MenuItem,
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
import { AddressFormSchema } from "../../model/address";
interface Props {
  formValue: AddressFormSchema;
  setFormValue: React.Dispatch<React.SetStateAction<AddressFormSchema>>;
}
const AddressForm: React.FC<Props> = ({ formValue, setFormValue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sampleAddress = useSelector((state: RootStore) => state.address.data);
  const [touched, setTouched] = useState({
    province: false,
    district: false,
    ward: false,
    street: false,
  });

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

  const handleChangeForm =
    (key: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
      const data = get(sampleAddress, key).find(
        (x: any) =>
          x[`${capitalize(key)}ID`] === (event.target.value as number) ||
          x[`${capitalize(key)}Code`] === (event.target.value as string)
      );

      setFormValue({
        ...formValue,
        [key]: {
          id:
            data[`${capitalize(key)}ID`] || data[`${capitalize(key)}Code`] || 0, //data.ProvinceID
          name: data[`${capitalize(key)}Name`],
          code: data[`${capitalize(key)}Code`],
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
            // native
            displayEmpty
            variant="outlined"
            value={formValue.province.id}
            onChange={handleChangeForm("province")}
            error={validator("province").error}
            onBlur={() => setTouched({ ...touched, province: true })}
          >
            {sampleAddress.province.map((item: any, index: number) => {
              return (
                <MenuItem key={index} value={item.ProvinceID}>
                  {item?.NameExtension[1]}
                </MenuItem>
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
            variant="outlined"
            value={formValue.district.id}
            onChange={handleChangeForm("district")}
            onBlur={() => setTouched({ ...touched, district: true })}
            // displayEmpty
          >
            {sampleAddress.district.map((item: any, index: number) => {
              return (
                <MenuItem key={index} value={item.DistrictID}>
                  {item?.DistrictName}
                </MenuItem>
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
            variant="outlined"
            value={formValue.ward.code}
            onChange={handleChangeForm("ward")}
            error={validator("ward").error}
            onBlur={() => setTouched({ ...touched, ward: true })}
          >
            {sampleAddress.ward.map((item: any, index: number) => {
              return (
                <MenuItem key={index} value={item.WardCode}>
                  {item?.WardName}
                </MenuItem>
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

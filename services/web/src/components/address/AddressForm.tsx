import {
  Grid,
  Select,
  InputLabel,
  makeStyles,
  Theme,
  FormGroup,
  createStyles,
  OutlinedInput,
} from "@material-ui/core";
import React, { useEffect } from "react";
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
      //sampleAddress.province[index]
      const data = get(
        sampleAddress,
        `${key}[${event.target.value as number}]`
      );
      setFormValue({
        ...formValue,
        [key]: {
          id: data[`${capitalize(key)}ID`] || 0, //data.ProvinceID
          name: data[`${capitalize(key)}Name`],
        },
      });
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
          {/* Province */}
          <InputLabel htmlFor="outlined-age-native-simple">
            Province/City
          </InputLabel>
          <Select
            native
            variant="outlined"
            value={formValue.province.name}
            onChange={handleChangeForm("province")}
            label="Province/City"
            inputProps={{
              name: "ProvinceID",
              id: "outlined-age-native-simple",
            }}
          >
            {sampleAddress.province.map((item: any, index: number) => {
              return (
                <option key={item.ProvinceID} value={index}>
                  {item.NameExtension[1]}
                </option>
              );
            })}
          </Select>
          {/* End Province */}
          {/* District */}
          <InputLabel htmlFor="outlined-age-native-simple">District</InputLabel>
          <Select
            native
            variant="outlined"
            value={formValue.district.name}
            onChange={handleChangeForm("district")}
            label="District"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
          >
            {sampleAddress.district.map((item: any, index: number) => {
              return (
                <option key={item.DistrictID} value={index}>
                  {item.NameExtension[1]}
                </option>
              );
            })}
          </Select>
          {/* End District */}
          {/* Ward */}
          <InputLabel htmlFor="outlined-age-native-simple">
            Ward/Commune
          </InputLabel>
          <Select
            native
            variant="outlined"
            value={formValue.ward.id}
            onChange={handleChangeForm("ward")}
            label="Ward/Commune"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
          >
            {sampleAddress.ward.map((item: any, index: number) => {
              return (
                <option key={item.WardCode} value={index}>
                  {item.WardName}
                </option>
              );
            })}
          </Select>
          {/* End Ward */}
          {/* Street */}
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
          />
          {/* End Street */}
        </FormGroup>
      </Grid>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      // minWidth: "100%",
      width: "100%",
      "& option": {
        padding: theme.spacing(2),
      },
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);
export default AddressForm;

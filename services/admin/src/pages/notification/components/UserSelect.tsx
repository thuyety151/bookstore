import {
  Avatar,
  Chip,
  ListItem,
  ListItemAvatar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import api from "boot/axios";
import React from "react";
import { useEffect, useState } from "react";
import logo from "../../../assets/images/default-img.png";

export type InputSelectProps = {
  fnGetOptions?: () => void;
  value: any;
  options?: any; // bad
  onChange: (value: any) => void;
  multiple?: boolean;
};

const UserSelect: React.FC<InputSelectProps> = (props) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = React.useState(props.value);
  useEffect(() => {
    api.get("/account/all").then((res) => {
      if (res.data) {
        // TODO: improvement: store + search + prevent reload when prop.value changes
        setOptions(res.data);
        setValue(
          res.data.filter((x: any) =>
            props.value.flatMap((x: any) => x.id).includes(x.id)
          )
        );
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {options.length > 0 && (
        <Autocomplete
          id="fixed-tags-demo"
          value={value || null}
          onChange={(event, newValue) => {
            setValue(newValue);
            props.onChange(newValue);
          }}
          options={options || []}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => {
            return option.name ?? "";
          }}
          multiple
          renderOption={(option) => (
            <ListItem component={"span"}>
              <ListItemAvatar
                children={
                  <Avatar
                    src={option.photoUrl || logo}
                    alt="user-avatar"
                    style={{ height: 30, width: 30 }}
                  />
                }
              />
              <Typography component={"span"}>{option.name || ""}</Typography>
            </ListItem>
          )}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Users"
              variant="outlined"
              error={!value}
            />
          )}
        />
      )}
    </>
  );
};

export default UserSelect;

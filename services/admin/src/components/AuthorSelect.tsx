import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import api from "boot/axios";
import React from "react";
import { useEffect, useState } from "react";

export type InputSelectProps = {
  fnGetOptions?: () => void;
  value: any;
  options?: any; // bad
  onChange: (value: any) => void;
  multiple?: boolean;
};

const AuthorSelect: React.FC<InputSelectProps> = (props) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = React.useState(props.value);

  useEffect(() => {
    (async () => {
      const res = await api.get("/authors", {
        params: {
          predicate: "all",
        },
      });
      if (res.data.isSuccess) {
        setOptions(res.data.value);
        setValue(res.data.value.find((x: any) => x.id === props.value));
      }
    })();
    //react-hooks/exhaustive-deps
  }, [props.value]);
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
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Author"
              variant="outlined"
              error={!value}
            />
          )}
        />
      )}
    </>
  );
};

export default AuthorSelect;

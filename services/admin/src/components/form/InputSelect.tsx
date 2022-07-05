import { Chip, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import api from "boot/axios";
import React from "react";
import { useEffect, useState } from "react";

export type InputSelectProps = {
  fnGetOptions?: () => void;
  apiUrl: string;
  value: any;
  options?: any; // bad
  onChange: (value: any) => void;
};

const InputSelect: React.FC<InputSelectProps> = (props) => {
  const [options, setoptions] = useState([]);
  const [value, setValue] = React.useState([...props.value]);

  useEffect(() => {
    (async () => {
      const res = await api.get(props.apiUrl);
      if (res.data.isSuccess) {
        setoptions(res.data.value);
        setValue(res.data.value.filter((x: any) => props.value.includes(x.id)));
      }
    })();
    return () => {
      setoptions([]);
      setValue([]);
    };
    //react-hooks/exhaustive-deps
  }, [props.apiUrl, props.value]);
  return (
    <>
      {options.length && (
        <Autocomplete
          multiple
          // fullWidth
          id="fixed-tags-demo"
          value={value || null}
          onChange={(event, newValue) => {
            setValue(newValue);
            props.onChange(newValue.flatMap((x) => x.id));
          }}
          options={options || []}
          getOptionSelected={(option, value) =>
            option.id === value || option.id === value.id
          }
          getOptionLabel={(option) => option.name}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              variant="outlined"
              error={!value.length}
            />
          )}
        />
      )}
    </>
  );
};

export default InputSelect;

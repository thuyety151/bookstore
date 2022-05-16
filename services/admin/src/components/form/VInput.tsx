import { TextField, TextFieldProps } from "@material-ui/core";
import { useValidator } from "helper/useValidator";
import { get, head } from "lodash";
import React, { useState } from "react";

export interface VRule {
  rules?: Array<string>;
}

const VInput: React.FC<TextFieldProps & VRule> = (props) => {
  const { value } = props;
  const helperText = props.helperText as string;
  const [onBlur, setOnBlur] = useState(false);
  const validator = useValidator(value, onBlur);

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOnBlur(true);
  };

  const rules =
    props.rules?.map((x: string) => {
      const m = get(validator, x);
      return m(helperText);
    }) || [];

  return (
    <div>
      <TextField
        {...props}
        error={!!head(rules.filter((e) => !!e))}
        id="outlined-error-helper-text"
        helperText={head(rules.filter((e) => !!e))}
        variant="outlined"
        value={value ||""}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default VInput;

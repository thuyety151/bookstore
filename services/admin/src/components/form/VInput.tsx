import { TextField, TextFieldProps } from "@material-ui/core";
import { useValidator } from "helper/useValidator";
import { get, head } from "lodash";
import { useEffect } from "react";

const VInput: React.FC<TextFieldProps> = (props) => {
  const value: { value: string; onBlur: boolean; ruleNames: Array<string> } =
    props.value as any;
  const validator = useValidator(value);
  const helperText = props.helperText as string;

  const rules = value.ruleNames.map((x: string) => {
    const m = get(validator, x);
    return m(helperText);
  });
  return (
    <div>
      <TextField
        {...props}
        error={!!head(rules.filter((e) => !!e))}
        id="outlined-error-helper-text"
        helperText={head(rules.filter((e) => !!e))}
        variant="outlined"
        value={value.value}
        type="number"
      />
    </div>
  );
};

export default VInput;

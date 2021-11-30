import { TextField, TextFieldProps } from "@material-ui/core";
import { head } from "lodash";

const VInput: React.FC<TextFieldProps> = (props) => {
  const value: { value: string; onBlur: boolean } = props.value as any;
  const validator = useValidator(value);
  const helperText = props.helperText as string;
  return (
    <div>
      <TextField
        {...props}
        error={!!validator.phoneNumber()}
        id="outlined-error-helper-text"
        helperText={head(
          [
            validator.required(helperText),
            validator.phoneNumber(helperText),
          ].filter((e) => !!e)
        )}
        variant="outlined"
        value={value.value}
      />
    </div>
  );
};

export default VInput;

type PropsForValidation = {
  value: string | Array<any>;
  onBlur: boolean;
};

const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

const useValidator = (props?: PropsForValidation) => {
  const initValue = props;

  const required = (message?: string | undefined, value?: any) => {
    const val = value || initValue?.value;
    if (initValue?.onBlur && (!val || !val.length)) {
      return message || "Value is required";
    }
  };

  const phoneNumber = (message?: string | undefined, value?: any) => {
    const val = value || initValue?.value;
    if (initValue?.onBlur && !vnf_regex.test(val)) {
      return message || "Phone number is invalid";
    }
  };

  return {
    required,
    phoneNumber,
  };
};

export enum ValidationName {
  Required = "required",
  PhoneNumber = "phoneNumber",
}

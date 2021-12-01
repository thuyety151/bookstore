// export const ruleEmail = (values: string) => {
//   if (!values) {
//     return "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
//     return "Invalid email address";
//   }
// };

type PropsForValidation = {
  value: string | Array<any>;
  onBlur: boolean;
  ruleNames?: Array<string>;
};

const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

export const useValidator = (props?: PropsForValidation) => {
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
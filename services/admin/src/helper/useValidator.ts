const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

export const useValidator = (value?: any, onBlur?: boolean) => {
  const required = (message?: string | undefined, cvalue?: any) => {
    const val = cvalue || value;

    if (onBlur && (!val || !val.length)) {
      return message || "Value is required";
    }
  };

  const phoneNumber = (message?: string | undefined, cvalue?: any) => {
    const val = cvalue || value?.value;

    if (!vnf_regex.test(val)) {
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

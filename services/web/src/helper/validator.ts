export const ruleEmail = (values: string) => {
  if (!values) {
    return "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
    return "Invalid email address";
  }
};
export const validator = () => {
  const required = () => {
    return (value: any) => {
      if (!value) {
        return "Yêu cầu không được để trống";
      }
    };
  };
  return {
    required,
  };
};

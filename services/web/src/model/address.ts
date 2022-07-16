export type AddressFormSchema = {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  apartmentNumber: string;
  province: {
    id: number;
    name: string;
    code: string;
  };
  district: {
    id: number;
    name: string;
    code: string;
  };
  ward: {
    id: number;
    name: string;
    code: string;
  };
  street: string;
  isDefault: boolean;
};

export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  apartmentNumber: string;
  streetAddress: string;
  districtId: number;
  provinceId: number;
  wardName: string;
  wardCode: string;
  districtName: string;
  provinceName: string;
  isMain: boolean;
};

export type InputValidation = {
  value: any;
  onBlur: boolean;
  ruleNames: string[];
};
export type AddressFormValidationSchema = {
  id?: string;
  firstName: InputValidation;
  lastName: InputValidation;
  phoneNumber: InputValidation;
  apartmentNumber: InputValidation;
  province: {
    id: number;
    name: string;
    code: string;
  };
  district: {
    id: number;
    name: string;
    code: string;
  };
  ward: {
    id: number;
    name: string;
    code: string;
  };
  street: string;
  isDefault: boolean;
};

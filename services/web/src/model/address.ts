export type AddressFormSchema = {
  firstName: string;
  lastName: string;
  province: {
    id: number;
    name: string;
  };
  district: {
    id: number;
    name: string;
  };
  ward: {
    id: number;
    name: string;
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
  districtID: number;
  provinceID: number;
  wardName: string;
  districtName: string;
  provinceName: string;
  isMain: boolean;
};
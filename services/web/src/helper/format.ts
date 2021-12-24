import { isEmpty, isNil } from "lodash";

export const formatAddress = ({
  apartmentNumber,
  streetAddress,
  wardName,
  districtName,
  provinceName,
}: {
  // declare type for props
  apartmentNumber?: any;
  streetAddress?: any;
  wardName?: any;
  districtName?: any;
  provinceName?: any;
}) => {
  return (
    [apartmentNumber, streetAddress, wardName, districtName, provinceName]
      .filter((item) => !isNil(item) && !isEmpty(item))
      .join(", ") || "--"
  );
};

export const formatVNDtoUSD = (data: number) => {
  return parseFloat((data / 23000).toFixed(2));
};

export const formatCustomerInfo = ({
  firstName,
  lastName,
  phone,
}: {
  // declare type for props
  firstName?: any;
  lastName?: any;
  phone?: any;
}) => {
  return firstName ? `${firstName} ${lastName} (${phone})` : "--";
};

export const formatAddressEnter = ({
  apartmentNumber,
  streetAddress,
  wardName,
  districtName,
  provinceName,
}: {
  // declare type for props
  apartmentNumber?: any;
  streetAddress?: any;
  wardName?: any;
  districtName?: any;
  provinceName?: any;
}) => {
  return (
    [apartmentNumber, streetAddress, wardName, districtName, provinceName]
      .filter((item) => !isNil(item) && !isEmpty(item))
      .join("\n") || "--"
  );
};

import { isEmpty, isNil } from "lodash";

export const formatAddress = ({
  street,
  wardName,
  districtName,
  provinceName,
}: {
  // declare type for props
  street?: any;
  wardName?: any;
  districtName?: any;
  provinceName?: any;
}) => {
  return (
    [street, wardName, districtName, provinceName]
      .filter((item) => !isNil(item) && !isEmpty(item))
      .join(", ") || "--"
  );
};

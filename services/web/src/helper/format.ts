import { isEmpty, isNil } from "lodash";

export const formatAddress = ({
  apartmentNumber,
  streetAddress,
  wardName,
  districtName,
  provinceName,
}: {
  // declare type for props
  apartmentNumber?:any;
  streetAddress?: any;
  wardName?: any;
  districtName?: any;
  provinceName?: any;
}) => {
  console.log("dd", [apartmentNumber,streetAddress, wardName, districtName, provinceName])
  return (
    [apartmentNumber,streetAddress, wardName, districtName, provinceName]
      .filter((item) => !isNil(item) && !isEmpty(item))
      .join(", ") || "--"
  );
};

export const formatVNDtoUSD=(data:number)=>{
  return parseFloat((data/23000).toFixed(2));
}

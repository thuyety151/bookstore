import apiGHN from "../../../boot/apiGHN";
import { shopAddress } from "../../../mocks/shopInfo";
import { Address } from "../../../model/address";
import store from "../../store";

export const getFee = async () => {
  const currentAddress = store.getState().address.currentAddress as Address;
  console.log("ds", currentAddress);
 
  const data = {
    from_district_id: shopAddress.district_id,
    service_id: 53320,
    service_type_id: null,
    to_district_id: currentAddress.districtId,
    to_ward_code: currentAddress.wardCode,
    height: 50,
    length: 20,
    weight: 200,
    width: 20,
    coupon: null,
  };
  const response = await apiGHN.post("/v2/shipping-order/fee", data);

  if (response.data.data) {
    // onSuccess(response.data.data.total);
    return response.data.data.total;
  }
};


import apiGHN from "../../../boot/apiGHN";
import { formatAddress } from "../../../helper/format";
import { Address } from "../../../model/address";
import Item from "../../../model/item";

export const createOrder = async (items: Item[], address: Address) => {
  try {
    // if create order success => create delivery
    const order = {
      payment_type_id: 2,
      note: "note",
      return_phone: address.phone,
      return_address: formatAddress(address),
      return_district_id: 1566,
      return_ward_code: "510104",
      to_name: address.firstName + " " + address.lastName,
      to_phone: address.phone,
      to_address: formatAddress(address),
      to_district_id: 1566,
      to_ward_code: "510102",
      required_note: "KHONGCHOXEMHANG",
      deliver_station_id: null,
      weight: 200,
      items: items.map((item) => {
        return {
          name: item.productName,
          code: "hi",
          quantity: item.quantity,
          price: item.price,
          category: {
            level1: "book",
          },
        };
      }),
    };
    const createDelivery = await apiGHN.post("/shipping-order/create", order);
    console.log("sda", createDelivery);
  } catch (error: any) {}
};

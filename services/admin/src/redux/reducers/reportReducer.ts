import { ACTION_NAMES } from "redux/actions/report/actionTypes";

export type Report = {
  name: string;
  shippingFee: string;
  refunded: string;
  itemsPurchased: string;
  orderPlaced: string;
  netSale: string;
};
export type ReportState = {
  requesting: boolean;
  message: string;
  data: Report[];
};

const initialState: ReportState = {
  requesting: false,
  message: "",
  data: [] as Report[],
};

const reportReducer = (
  state: ReportState = initialState,
  payload: any
): ReportState => {
  switch (payload.type) {
    case ACTION_NAMES.GET_REPORTS.GET_REPORTS:
      return {
        ...state,
        // data: [] as any,
        requesting: true,
      };
    case ACTION_NAMES.GET_REPORTS.GET_REPORTS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        requesting: false,
      };
    case ACTION_NAMES.GET_REPORTS.GET_REPORTS_FAIL:
      return {
        ...state,
        requesting: false,
      };
    
    default:
      return state;
  }
};

export default reportReducer;

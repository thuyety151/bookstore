import { ACTION_NAMES } from "../actions/settings/actionTypes";

export type Setting = {
  id: string;
  key: string;
  quantity: number;
  defaultAttributeId?: string;
  metaData?: string;
};

export type SettingsState = {
  requesting: boolean;
  data: Setting[];
};
const initState: SettingsState = {
  requesting: false,
  data: [],
};
const settingsReducer = (
  state: SettingsState = initState,
  payload: any
): SettingsState => {
  switch (payload.type) {
    case ACTION_NAMES.GET_ALL_SETTINGS.GET_ALL:
      return {
        ...state,
        requesting: true,
        data: [],
      };
    case ACTION_NAMES.GET_ALL_SETTINGS.GET_ALL_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
      };
    case ACTION_NAMES.GET_ALL_SETTINGS.GET_ALL_FAIL:
      return {
        ...state,
        requesting: false,
      };
    case ACTION_NAMES.UPDATE_SETTINGS.UPDATE:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.UPDATE_SETTINGS.UPDATE_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
      };
    case ACTION_NAMES.UPDATE_SETTINGS.UPDATE_FAIL:
      return {
        ...state,
        requesting: false,
      };
    default:
      return state;
  }
};

export default settingsReducer;

import { AppStoreState } from "../storeRedux";

export const selectAppLanguage = (state: AppStoreState) =>
  state.settings.language;

export const selectWifiDeviceSettings = (state: AppStoreState) =>
  state.settings.wifi;

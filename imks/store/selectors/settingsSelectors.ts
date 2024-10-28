import { AppStoreState } from "../storeRedux";

export const selectAppLanguage = (state: AppStoreState) =>
  state.settings.language;

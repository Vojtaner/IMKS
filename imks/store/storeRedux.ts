import { configureStore, createSelector } from "@reduxjs/toolkit";
import channelsSlice from "./slices/channelsSlice";
import settingsSlice from "./slices/settingsSlice";
import { useDispatch, useSelector } from "react-redux";

const appStore = configureStore({
  reducer: {
    settings: settingsSlice,
    channels: channelsSlice,
  },
});

export type AppStoreState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export type AppStore = typeof appStore;
export default appStore;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppStoreState>();
export const createAppSelector = createSelector.withTypes<AppStoreState>();

export const getAppState = () => appStore.getState();
export const selectFromAppState = <ImksState>(
  selector: (state: AppStoreState) => ImksState
): ImksState => {
  return selector(getAppState());
};

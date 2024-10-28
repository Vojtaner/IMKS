import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppStoreState } from "./storeRedux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useImksDispatch = useDispatch.withTypes<AppDispatch>();
export const useImksSelector = useSelector.withTypes<AppStoreState>();

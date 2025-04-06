import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppStoreState } from "./storeRedux";

export const useImksDispatch = useDispatch.withTypes<AppDispatch>();
export const useImksSelector = useSelector.withTypes<AppStoreState>();

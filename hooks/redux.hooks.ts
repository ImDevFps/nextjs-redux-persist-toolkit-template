import { AppDispatch, AppState } from "@/redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type DispatchFunc = () => AppDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch: DispatchFunc = useDispatch;

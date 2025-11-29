import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import AddToCart from "./AddToCart/AddToCart";
import CartHistory from './Orders/OrderHistory'
const store = configureStore({
  reducer: {
    cart: AddToCart,
    history:CartHistory
  },
});

// This creates a type that represents the complete state tree of your Redux store
export type RootState = ReturnType<typeof store.getState>;

// This creates a type for the dispatch function
export type AppDispatch = typeof store.dispatch;

// These are typed versions of useDispatch and useSelector hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
// : () => AppDispatch - This is the type annotation saying it's a function that returns an AppDispatch.
//  = useDispatch - Assigns the regular Redux useDispatch hook but with proper typing

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//  : TypedUseSelectorHook<RootState> - This type ensures the selector knows about your store's state structure
//  = useSelector - Assigns the regular Redux useSelector hook but with proper typing

export default store;

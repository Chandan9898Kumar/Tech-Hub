import { createSlice } from "@reduxjs/toolkit";

interface PayloadProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  details: string[];
  quantity: number;
}

interface CartState {
  items: PayloadProps[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const Cart = createSlice({
  name: "addToCart",
  initialState: initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity = newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.totalQuantity = state.items.length
        ? state.items.reduce((acc, curr) => acc + curr.quantity, 0)
        : 0;
    },
  },
});

export const { addItemToCart } = Cart.actions;
// This is the action creator function that will be used to dispatch actions to the Redux store.
export default Cart.reducer;
// This is the reducer function that will be used to update the state in the Redux store.

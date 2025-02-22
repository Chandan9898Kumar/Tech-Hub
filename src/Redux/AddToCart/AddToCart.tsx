import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    addItemToCart(state, action: PayloadAction<PayloadProps>) {
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

//  Different Payload Types:

/**
reducers: {
    // Payload is a single number
    removeItem(state, action: PayloadAction<number>) {
        const id = action.payload;
    },

    // Payload is an object
    updateItem(state, action: PayloadAction<{
        id: number;
        updates: Partial<CartItem>;
    }>) {
        const { id, updates } = action.payload;
    },

    // Payload is an array
    addMultipleItems(state, action: PayloadAction<CartItem[]>) {
        const newItems = action.payload;
    },

    // No payload needed
    clearCart(state, action: PayloadAction<void>) {
        state.items = [];
    }
}
 
 */

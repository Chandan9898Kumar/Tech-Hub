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
  totalAmount: number;
}

interface QuantPayloads {
  id: number;
  quantity: number;
}

type id = number;

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const Cart = createSlice({
  name: "addToCart",
  initialState: initialState,
  reducers: {
    // Here we don't need to explicitly specify void as the return type. This code appears to be a Redux reducer function using Redux Toolkit, and these reducer functions implicitly return void since they directly mutate the state using Immer (which Redux Toolkit uses under the hood).
    // TypeScript will automatically infer the return type as void since there's no explicit return statement.
    addItemToCart(state, action: PayloadAction<PayloadProps>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      // Calculate both totals in a single iteration
      const totals = state.items.reduce(
        (acc, item) => ({
          quantity: acc.quantity + item.quantity,
          amount: acc.amount + item.price * item.quantity,
        }),
        { quantity: 0, amount: 0 }
      );

      state.totalQuantity = totals.quantity;
      state.totalAmount = totals.amount;
    },

    updateCartQuantity(state, action: PayloadAction<QuantPayloads>) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
        // Single reduce operation for both calculations
        const totals = state.items.reduce(
          (acc, item) => ({
            quantity: acc.quantity + item.quantity,
            amount: acc.amount + item.price * item.quantity,
          }),
          { quantity: 0, amount: 0 }
        );

        state.totalQuantity = totals.quantity;
        state.totalAmount = totals.amount;
      }
    },

    removeCartItem(state, action: PayloadAction<id>) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      // Single reduce operation for both calculations
      const totals = state.items.reduce(
        (acc, item) => ({
          quantity: acc.quantity + item.quantity,
          amount: acc.amount + item.price * item.quantity,
        }),
        { quantity: 0, amount: 0 }
      );

      state.totalQuantity = totals.quantity;
      state.totalAmount = totals.amount;
    },
    resetCart(){
      return initialState;
    }
  },
});

export const { addItemToCart, updateCartQuantity, removeCartItem, resetCart } =
  Cart.actions;
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

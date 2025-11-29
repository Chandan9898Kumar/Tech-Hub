import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  details: string[];
  quantity: number;
}

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  label: string;
  lastFourDigits: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
  icon: string | null;
}

interface Order {
  orderNumber: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  estimatedDelivery: string;
  status: string;
}

interface OrderHistory {
  orderHistory: Order[];
}

const initialState: OrderHistory = {
  orderHistory: [],
};

const History = createSlice({
  name: "orderHistory",
  initialState: initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<Order>) {
      const orderedItem = action.payload;
      const existingOrder = state.orderHistory.find(
        order => order.orderNumber === orderedItem.orderNumber
      );
      
      if (!existingOrder) {
        state.orderHistory.push(orderedItem);
      }
    },
    removeFromhistory(state, action: PayloadAction<{ orderId: string }>) {
      state.orderHistory = state.orderHistory.filter(
        order => order.orderNumber !== action.payload.orderId
      );
    },
  },
});

export const { addToHistory, removeFromhistory } = History.actions;

export default History.reducer;

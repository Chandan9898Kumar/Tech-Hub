export interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  details: string[];
}

export interface PaymentMethod {
  id: string;
  label: string;
  lastFourDigits: string;
  type: string;
}

export interface ShippingAddress {
  addressLine1: string;
  city: string;
  country: string;
  fullName: string;
  phoneNumber: string;
  state: string;
  zipCode: string;
}

export interface ShippingMethods {
  description: string;
  estimatedDelivery: string;
  icon: null;
  id: string;
  name: string;
  price: number;
}

export interface ConfirmationComponent {
  orderNumber: string;
  orderDate: string;
  items: Item[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  status: string;
  estimatedDelivery: string;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethods;
}

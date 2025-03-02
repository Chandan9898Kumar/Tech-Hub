import { LucideIcon } from "lucide-react";

export interface ValidationRule {
  field: string;
  message: string;
  validate: (value: string) => boolean;
}

export interface FormDetail {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string 
  expiryDate: string;
  cvv: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  eta: string;
  icon: LucideIcon;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: LucideIcon;
  description:string
}

export interface CheckoutStep {
  title: string;
  icon: LucideIcon;
}

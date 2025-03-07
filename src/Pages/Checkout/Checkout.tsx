import { ChangeEvent, useState, useCallback } from "react";
import ButtonBase from "@Components/Button/Button";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import {
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Truck,
  ShieldCheck,
  Package,
  Clock,
  Wallet,
} from "lucide-react";
import {
  getCurrentDateTime,
  validateEmail,
  validateCreditCardNumber,
  validateCVV,
  validateExpiryDate,
  validatePostalCode,
} from "../../utils/Utils";

import {
  FormDetail,
  ValidationRule,
  ShippingMethod,
  PaymentMethod,
  CheckoutStep,
} from "./Interface";
import Shipping from "./Shipping";
import Payment from "./Payment";
import OrderConfirmation from "./OrderConfirmation";
import Progress from "./Progress";
import OrderSummary from "./OrderSummary";
import ShippingInfo from "./ShippingInfo";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "../../Redux/Store";
// Create a motion button component
const MotionButtonBase = motion(ButtonBase);

// Animation variants
const buttonVariants = {
  initial: (direction: number) => ({
    x: direction * 50,
    opacity: 0,
    scale: 0.9,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: (direction: number) => ({
    x: direction * 50,
    opacity: 0,
    scale: 0.9,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Icon animation variants
const iconVariants = {
  initial: { opacity: 0, x: -5 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
    },
  },
  hover: (direction: number) => ({
    x: direction * 5,
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 0.6,
    },
  }),
};

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Delivery",
    price: 4.99,
    eta: "3-5 business days",
    icon: Truck,
  },
  {
    id: "express",
    name: "Express Delivery",
    price: 14.99,
    eta: "1-2 business days",
    icon: Clock,
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    id: "credit-card",
    name: "Credit Card",
    icon: CreditCard,
    description: "Pay securely with your credit card",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Package,
    description: "Fast and secure payment with PayPal",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: Wallet,
    description: "Quick payment with Apple Pay",
  },
  {
    id: "google-pay",
    name: "Google Pay",
    icon: Wallet,
    description: "Easy payment with Google Pay",
  },
];

const CheckoutSteps: CheckoutStep[] = [
  { title: "Shipping", icon: Truck },
  { title: "Payment", icon: CreditCard },
  { title: "Confirmation", icon: ShieldCheck },
];

const formValidationRules: ValidationRule[] = [
  {
    field: "firstName",
    message: "First Name should not be empty",
    validate: (value) => value.trim() !== "",
  },
  {
    field: "lastName",
    message: "Last Name should not be empty",
    validate: (value) => value.trim() !== "",
  },
  {
    field: "email",
    message: "Invalid email format",
    validate: (value) => {
      const emailResult = validateEmail(value);
      return emailResult.isValid;
    },
  },
  {
    field: "address",
    message: "Address should not be empty",
    validate: (value) => value.trim() !== "",
  },
  {
    field: "city",
    message: "City should not be empty",
    validate: (value) => value.trim() !== "",
  },
  {
    field: "postalCode",
    message: "Postal Code is not valid",
    validate: (value) => validatePostalCode(value),
  },
];

type FormDetailsType = Omit<FormDetail, "cardNumber" | "expiryDate" | "cvv"> & {
  [key: string]: string;
};
const formValidation = (formDetails: FormDetailsType): string => {
  for (const rule of formValidationRules) {
    if (rule.field in formDetails) {
      const value = formDetails[rule.field] as string;
      if (!rule.validate(value)) {
        return rule.message;
      }
    }
  }
  return "";
};

const cardValidationRule: ValidationRule[] = [
  {
    field: "cardNumber",
    message: "Your Card number is not valid",
    validate: (value) => validateCreditCardNumber(value),
  },
  {
    field: "cvv",
    message: "Your Cvv number is not valid",
    validate: (value) => validateCVV(value),
  },

  {
    field: "expiryDate",
    message: "Your expiryDate is is not valid",
    validate: (value) => validateExpiryDate(value),
  },
];

type CardValidations = Pick<FormDetail, "cardNumber" | "expiryDate" | "cvv"> & {
  [key: string]: string;
};

const CardValidation = (cardDetails: CardValidations): string => {
  for (const rule of cardValidationRule) {
    if (rule.field in cardDetails) {
      const value = cardDetails[rule.field];
      if (!rule.validate(value)) {
        return rule.message;
      }
    }
  }

  return "";
};

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedShipping, setSelectedShipping] = useState(
    shippingMethods[0].id
  );
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const navigate = useNavigate();
  const orderItems = useAppSelector((state) => state.cart.items);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const name = event.target.name;
      setFormData((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    },
    []
  );

  const handleNextStep = (): void => {
    const validationMessage = !currentStep
      ? formValidation(formData)
      : selectedPayment === "credit-card"
      ? CardValidation(formData)
      : "";
    if (validationMessage) {
      toast(`${validationMessage}`, {
        description: getCurrentDateTime(),
      });
      return;
    }

    setCurrentStep(Math.min(CheckoutSteps.length - 1, currentStep + 1));
  };

  const handleBackStep = (): void => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const calculateTotal = () => {
    const subtotal =
      orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
      0;
    const shipping =
      shippingMethods.find((method) => method.id === selectedShipping)?.price ||
      0;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
      discount: 0,
    };
  };
  const handlePlaceOrder = (): void => {
    toast.success("Order placed successfully!");
    navigate("/confirmation", {
      state: {
        orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
        orderDate: new Date().toISOString(),
        items: orderItems,
        subtotal: calculateTotal().subtotal,
        shippingCost: calculateTotal().shipping,
        discount: calculateTotal().discount,
        tax: calculateTotal().subtotal * 0.08,
        total: calculateTotal().total,
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          addressLine1: formData.address,
          city: formData.city,
          state: "California",
          zipCode: formData.postalCode,
          country: "United States",
          phoneNumber: "555-555-5555",
        },
        paymentMethod: {
          id: selectedPayment,
          type: selectedPayment === "credit-card" ? "credit" : selectedPayment,
          label:
            paymentMethods.find((m) => m.id === selectedPayment)?.name || "",
          lastFourDigits: formData.cardNumber
            ? formData.cardNumber.slice(-4)
            : "",
        },
        shippingMethod: {
          id: selectedShipping,
          name:
            shippingMethods.find((m) => m.id === selectedShipping)?.name || "",
          description: "",
          price:
            shippingMethods.find((m) => m.id === selectedShipping)?.price || 0,
          estimatedDelivery:
            shippingMethods.find((m) => m.id === selectedShipping)?.eta || "",
          icon: null,
        },
        estimatedDelivery:
          shippingMethods.find((m) => m.id === selectedShipping)?.eta || "",
        status: "Confirmed",
      },
    });
  };

  return (
    <div className="min-h-screen bg-muted p-6 animate-fade-in">
      <Toaster />
      <ButtonBase
        variant="text"
        className="mb-6 hover:bg-primary/10"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </ButtonBase>

      <div className="max-w-7xl mx-auto grid grid-cols-10 lg:grid-cols-3 gap-10">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Steps */}
          <Progress CheckoutSteps={CheckoutSteps} currentStep={currentStep} />

          <Card className="p-6 backdrop-blur-sm bg-white/80">
            {/* Shipping Information */}
            {currentStep === 0 && (
              <Shipping
                formData={formData}
                handleInputChange={handleInputChange}
                selectedShipping={selectedShipping}
                setSelectedShipping={setSelectedShipping}
                shippingMethods={shippingMethods}
              />
            )}

            {/* Payment Information */}
            {currentStep === 1 && (
              <Payment
                formData={formData}
                handleInputChange={handleInputChange}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                paymentMethods={paymentMethods}
              />
            )}

            {/* Order Confirmation */}
            {currentStep === 2 && (
              <OrderConfirmation
                formData={formData}
                selectedPayment={selectedPayment}
                shippingMethods={shippingMethods}
                selectedShipping={selectedShipping}
              />
            )}

            {/* Navigation Buttons */}
            <AnimatePresence mode="wait">
              <div
                className={`${
                  currentStep
                    ? "flex justify-between mt-8 gap-4"
                    : " flex justify-end mt-8 gap-4"
                }`}
              >
                {!!currentStep && (
                  <MotionButtonBase
                    variant="outlined"
                    onClick={handleBackStep}
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                    whileTap="tap"
                    custom={-1} // Slides from left
                    className="bg-white hover:bg-gray-50 border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <motion.span
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      custom={-1}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </motion.span>
                    Previous
                  </MotionButtonBase>
                )}
                <MotionButtonBase
                  onClick={
                    currentStep === CheckoutSteps.length - 1
                      ? handlePlaceOrder
                      : handleNextStep
                  }
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                  custom={1} // Slides from right
                  className={`ml-auto bg-purple-600 hover:bg-purple-700 text-white 
        px-6 py-2 rounded-lg flex items-center gap-2 shadow-md 
        hover:shadow-lg transition-all duration-300`}
                >
                  {currentStep === CheckoutSteps.length - 1
                    ? "Place Order"
                    : "Continue"}
                  <motion.span
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    custom={1}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </MotionButtonBase>
              </div>
            </AnimatePresence>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 space-y-6">
          <OrderSummary
            shippingMethods={shippingMethods}
            selectedShipping={selectedShipping}
          />
          <ShippingInfo />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

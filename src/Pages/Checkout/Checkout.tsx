import React, { ChangeEvent, useState } from "react";
import ButtonBase from "@Components/Button/Button";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import Input from "@Components/InputField/Input";
// import { toast } from "sonner";
import {
  CreditCard,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Package,
  Clock,
  MapPin,
  CheckCircle2,
  BadgePercent,
} from "lucide-react";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { label } from "@/components/ui/label";
// import { toast } from "sonner";

// Mock data for the order
const orderItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    quantity: 1,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    quantity: 1,
    image: "/placeholder.svg",
  },
];

const shippingMethods = [
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

const paymentMethods = [
  {
    id: "credit-card",
    name: "Credit Card",
    icon: CreditCard,
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Package,
  },
];

const CheckoutSteps = [
  { title: "Shipping", icon: Truck },
  { title: "Payment", icon: CreditCard },
  { title: "Confirmation", icon: ShieldCheck },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedShipping, setSelectedShipping] = useState(
    shippingMethods[0].id
  );
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [couponCode, setCouponCode] = useState("");
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="min-h-screen bg-muted p-6 animate-fade-in">
      <ButtonBase
        variant="text"
        className="mb-6 hover:bg-primary/10"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </ButtonBase>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {CheckoutSteps.map((step, index) => (
              <div
                key={step.title}
                className={`flex items-center ${
                  index <= currentStep ? "text-purple-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= currentStep ? "bg-purple-600" : "bg-gray-200"
                  }`}
                >
                  <step.icon
                    className={`h-5 w-5 ${
                      index <= currentStep ? "text-white" : "text-gray-400"
                    }`}
                  />
                </div>
                <span className="ml-2 font-medium">{step.title}</span>
                {index < CheckoutSteps.length - 1 && (
                  <div
                    className={`h-[2px] w-16 mx-4 transition-all duration-300 ${
                      index < currentStep ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="p-6 backdrop-blur-sm bg-white/80">
            {/* Shipping Information */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center space-x-2 mb-6">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    Shipping Information
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName">First Name</label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      label="First Name"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName">Last Name</label>
                    <Input
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label htmlFor="address">Address</label>
                    <Input
                      id="address"
                      name="address"
                      label="Address"
                      type="text"
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="city">City</label>
                    <Input
                      id="city"
                      name="city"
                      label="City"
                      type="text"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="postalCode">Postal Code</label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      label="PostalCode"
                      type="text"
                      placeholder="10001"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <h3 className="font-medium flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-primary" />
                    Shipping Method
                  </h3>
                  {/* <RadioGroup
                    value={selectedShipping}
                    onValueChange={setSelectedShipping}
                    className="grid grid-cols-2 gap-4"
                  >
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedShipping === method.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex-1">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {method.eta}
                          </div>
                          <div className="font-medium text-primary">
                            ${method.price.toFixed(2)}
                          </div>
                        </div>
                      </label>
                    ))}
                  </RadioGroup> */}
                </div>
              </div>
            )}

            {/* Payment Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center space-x-2 mb-6">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold">Payment Method</h2>
                </div>

                {/* <RadioGroup
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                  className="grid grid-cols-2 gap-4 mb-6"
                >
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedPayment === method.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex items-center space-x-2">
                        <method.icon className="h-5 w-5" />
                        <span className="font-medium">{method.name}</span>
                      </div>
                    </label>
                  ))}
                </RadioGroup> */}

                {selectedPayment === "credit-card" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <label htmlFor="cardNumber">Card Number</label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        label="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          label="expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="cvv">CVV</label>
                        <Input
                          id="cvv"
                          name="cvv"
                          label="cvv"
                          type="text"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Order Confirmation */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center space-x-2 mb-6">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold">Order Confirmation</h2>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <p className="text-muted-foreground">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.postalCode}
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p className="text-muted-foreground">
                      {selectedPayment === "credit-card"
                        ? `Card ending in ${formData.cardNumber.slice(-4)}`
                        : "PayPal"}
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Shipping Method</h3>
                    <p className="text-muted-foreground">
                      {
                        shippingMethods.find((m) => m.id === selectedShipping)
                          ?.name
                      }
                      {" - "}
                      {
                        shippingMethods.find((m) => m.id === selectedShipping)
                          ?.eta
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <ButtonBase variant="text">Previous</ButtonBase>
              )}
              <ButtonBase
                // onClick={currentStep === CheckoutSteps.length - 1 ? () => {
                //   toast.success("Order placed successfully!");
                //   navigate("/order-history");
                // } : ()=>{}}
                className="ml-auto"
              >
                {currentStep === CheckoutSteps.length - 1
                  ? "Place Order"
                  : "Continue"}
              </ButtonBase>
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 backdrop-blur-sm bg-white/80 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    {/* <span>${calculateTotal().subtotal.toFixed(2)}</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {/* <span>${calculateTotal().shipping.toFixed(2)}</span> */}
                  </div>
                  {/* {calculateTotal().discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${calculateTotal().discount.toFixed(2)}</span>
                    </div>
                  )} */}
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    {/* <span>${calculateTotal().total.toFixed(2)}</span> */}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Secure checkout
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import Input from "@Components/InputField/Input";
import { CreditCard, ShieldCheck, Wallet } from "lucide-react";
import { ChangeEvent, FC, memo } from "react";
import { Label } from "../../Components/Label/Label";
import { ReactElement } from "react";
import { FormDetail, PaymentMethod } from "./Interface";
type SelectedFormData = Pick<FormDetail, "cardNumber" | "expiryDate" | "cvv">;

interface PaymentProps {
  formData: SelectedFormData;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedPayment: string;
  setSelectedPayment: (value: string) => void;
  paymentMethods: PaymentMethod[];
}

type PaymentMethodType = "credit-card" | "paypal" | "apple-pay" | "google-pay";

//  Here at PaymentIconMap, we can not use interface because : Interfaces in TypeScript don't support mapped type syntax directly. Type aliases (defined with type) are more flexible and support advanced type operations like mapped types.
type PaymentIconMap = {
  [key in PaymentMethodType]: ReactElement;
};

const getPaymentIcon: PaymentIconMap = {
  "credit-card": <CreditCard className="h-6 w-6 text-primary" />,
  "paypal": <Wallet className="h-6 w-6 text-primary" />,
  "apple-pay": <Wallet className="h-6 w-6 text-primary" />,
  "google-pay": <Wallet className="h-6 w-6 text-primary" />,
};

const Payment: FC<PaymentProps> = ({
  formData,
  handleInputChange,
  selectedPayment,
  setSelectedPayment,
  paymentMethods,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <CreditCard className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Payment Method</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`relative rounded-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
              selectedPayment === method.id
                ? "border-primary bg-primary/5"
                : "border-transparent hover:border-primary/50"
            }`}
            onClick={() => setSelectedPayment(method.id)}
          >
            <div className="absolute top-4 right-4">
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedPayment === method.id
                    ? "border-primary bg-primary"
                    : "border-gray-300"
                }`}
              >
                {selectedPayment === method.id && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-scale-in" />
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  {getPaymentIcon[method.id as PaymentMethodType]}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{method.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {method.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPayment === "credit-card" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-lg border bg-primary/5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    label="Card Number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="pl-12"
                  />
                  {/* <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" /> */}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <div className="relative">
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      label="Expiry Date"
                      type="text"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                       className="pl-12"
                    />
                    {/* <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" /> */}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <div className="relative">
                    <Input
                      id="cvv"
                      name="cvv"
                      label="Cvv"
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="pl-12"
                    />
                    {/* <ShieldCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" /> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5" />
              <span>Your payment info is secure and encrypted</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Payment);

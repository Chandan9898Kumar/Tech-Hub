import Input from "@Components/InputField/Input";
import { memo, ChangeEvent, FC } from "react";
import { CreditCard } from "lucide-react";
import { FormDetail } from "./Interface";

type SelectedFormData = Pick<FormDetail, "cardNumber" | "expiryDate" | "cvv">;

interface PaymentProps {
  formData: SelectedFormData;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedPayment: string;
}

const Payment: FC<PaymentProps> = ({
  formData,
  handleInputChange,
  selectedPayment,
}) => {
  return (
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
              label="Card Number"
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
                label="Expiry Date"
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
                label="Cvv"
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
  );
};

export default memo(Payment);

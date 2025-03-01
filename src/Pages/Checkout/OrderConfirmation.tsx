import { memo, FC } from "react";
import { CheckCircle2 } from "lucide-react";
import { FormDetail, ShippingMethod } from "./Interface";

interface OrderProps {
  formData: FormDetail;
  selectedPayment: string;
  shippingMethods: ShippingMethod[];
  selectedShipping: string;
}

const OrderConfirmation: FC<OrderProps> = ({
  formData,
  selectedPayment,
  shippingMethods,
  selectedShipping,
}) => {
  return (
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
            {shippingMethods.find((m) => m.id === selectedShipping)?.name}
            {" - "}
            {shippingMethods.find((m) => m.id === selectedShipping)?.eta}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderConfirmation);

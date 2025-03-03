import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@Components/Card/Card";
import { CreditCard, Shield } from "lucide-react";
import React from "react";
import { PaymentMethod } from "./Interface";

interface PaymentInformationProps {
  paymentMethod: PaymentMethod;
}

// Component to render the payment method icon
const PaymentMethodIcon = ({
  type,
  className,
}: {
  type: string;
  className?: string;
}) => {
  switch (type) {
    case "credit":
      return <CreditCard className={className} />;
    case "paypal":
      return <CreditCard className={className} />;
    case "apple":
      return <CreditCard className={className} />;
    case "google":
      return <CreditCard className={className} />;
    default:
      return <CreditCard className={className} />;
  }
};

export const PaymentInformation: React.FC<PaymentInformationProps> = ({
  paymentMethod,
}) => {
  return (
    <Card className="shadow-lg border-t border-l border-white/20 overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:border-primary/20 group">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="font-medium flex items-center gap-2">
            <PaymentMethodIcon
              type={paymentMethod.type}
              className="h-4 w-4 text-primary/80"
            />
            {paymentMethod.label}
          </p>
          {paymentMethod.lastFourDigits && (
            <p className="text-muted-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary/80" />
              Card ending in {paymentMethod.lastFourDigits}
            </p>
          )}
          <p className="text-sm bg-muted/30 p-2 rounded-md flex items-center gap-2 mt-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-green-600">Secure payment processed</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

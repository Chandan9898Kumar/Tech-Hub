import React, { memo } from "react";
import { Card } from "@Components/Card/Card";
import { Truck, ShieldCheck } from "lucide-react";

const ShippingInfo: React.FC = () => {
  return (
    <>
      <Card className="p-5 backdrop-blur-sm bg-white/90 shadow-xl rounded-xl border-t border-l border-white/20 animate-fade-in">
        <div className="flex items-center gap-2 text-primary mb-3">
          <Truck className="h-5 w-5" />
          <h3 className="font-medium">Free shipping on orders over $100</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          All orders are processed and shipped within 1-2 business days.
        </p>
      </Card>

      <Card className="p-5 backdrop-blur-sm bg-white/90 shadow-xl rounded-xl border-t border-l border-white/20 animate-fade-in">
        <div className="flex items-center gap-2 text-primary mb-3">
          <ShieldCheck className="h-5 w-5" />
          <h3 className="font-medium">Secure Payment</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Your payment information is processed securely through our payment
          gateway.
        </p>
      </Card>
    </>
  );
};

export default memo(ShippingInfo);

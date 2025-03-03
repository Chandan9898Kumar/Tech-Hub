import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@Components/Card/Card";
import { Truck, Package, Calendar, Timer, MapPin } from "lucide-react";
import { ShippingMethods } from "./Interface";

interface DeliveryInformationProps {
  shippingMethod: ShippingMethods;
  estimatedDelivery: string;
}

export const DeliveryInformation: React.FC<DeliveryInformationProps> = ({
  shippingMethod,
  estimatedDelivery,
}) => {
  // Helper function to get estimated delivery date
  const getEstimatedDeliveryDate = () => {
    const date = new Date();
    // Add days based on shipping method
    date.setDate(date.getDate() + (shippingMethod.id === "express" ? 2 : 5));
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className="shadow-lg border-t border-l border-white/20 overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:border-primary/20 group">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          Delivery Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="font-medium flex items-center gap-2">
            <Package className="h-4 w-4 text-primary/80" />
            {shippingMethod.name}
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary/80" />
            Estimated delivery: {getEstimatedDeliveryDate()}
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary/80" />
            Delivery time: {estimatedDelivery}
          </p>

          <div className="mt-3 pt-3 border-t flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary animate-bounce" />
            <span className="text-sm text-primary/80">
              Track shipment updates
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

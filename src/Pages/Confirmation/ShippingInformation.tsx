import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@Components/Card/Card";
import { Building, Home, MapPin, Phone, User } from "lucide-react";
import React from "react";
import { ShippingAddress } from "./Interface";

interface ShippingInformationProps {
  shippingAddress: ShippingAddress;
}
export const ShippingInformation: React.FC<ShippingInformationProps> = ({
  shippingAddress,
}) => {
  return (
    <Card className="shadow-lg border-t border-l border-white/20 overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:border-primary/20 group">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          Shipping Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="font-medium flex items-center gap-2">
            <User className="h-4 w-4 text-primary/80" />
            {shippingAddress.fullName}
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <Home className="h-4 w-4 text-primary/80" />
            {shippingAddress.addressLine1}
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <Building className="h-4 w-4 text-primary/80" />
            {shippingAddress.city}, {shippingAddress.state}{" "}
            {shippingAddress.zipCode}
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary/80" />
            {shippingAddress.country}
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary/80" />
            {shippingAddress.phoneNumber}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@Components/Card/Card";
import { motion } from "framer-motion";
import { CircleDollarSign, Receipt, ShoppingBag, Truck } from "lucide-react";
import React from "react";
import { ConfirmationComponent } from "./Interface";
import { OrderSummaryItem } from "./OrderSummaryItem";

type OrderSummaryProps = Pick<
  ConfirmationComponent,
  "items" | "subtotal" | "shippingCost" | "tax" | "total"
>;

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shippingCost,
  tax,
  total,
}) => {
  return (
    <Card className="shadow-lg border-t border-l border-white/20 overflow-hidden h-full hover:shadow-xl transition-shadow duration-300 group">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          Order Summary
        </CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4 mb-6">
          {items.map((item, index) => (
            <OrderSummaryItem key={index} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="border-t pt-4 space-y-2"
        >
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-primary/80" />
              Subtotal
            </span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary/80" />
              Shipping
            </span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-primary/80" />
              Tax
            </span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-primary" />
              Total
            </span>
            <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              ${total.toFixed(2)}
            </span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

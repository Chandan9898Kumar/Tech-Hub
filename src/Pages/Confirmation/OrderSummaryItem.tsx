import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import React from "react";
import { Item } from "./Interface";

interface CartItems extends Item {
  quantity: number;
}

interface OrderSummaryItemProps {
  item: CartItems;
  index: number;
}

export const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({
  item,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
      className="flex items-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors hover:scale-[1.01] cursor-pointer relative"
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white mr-4 shadow-md group-hover:shadow-lg transition-all">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium hover:text-primary transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          Quantity: {item.quantity}
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium text-primary">${item.price.toFixed(2)}</p>
        {item.quantity > 1 && (
          <p className="text-sm text-muted-foreground">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        )}
      </div>

      {index === 0 && (
        <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
          <Sparkles className="h-3 w-3" />
          <span>Best Seller</span>
        </div>
      )}
    </motion.div>
  );
};

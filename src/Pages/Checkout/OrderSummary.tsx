import ButtonBase from "@Components/Button/Button";
import Card from "@mui/material/Card";
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  Minus,
  Plus,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import React, { memo, MouseEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../Redux/Store";
import { updateCartQuantity } from "../../Redux/AddToCart/AddToCart";
import { ShippingMethod } from "./Interface";
interface OrderSummaryProps {
  shippingMethods: ShippingMethod[];
  selectedShipping: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  shippingMethods = [],
  selectedShipping = "",
}) => {
  const [showOrderSummary, setShowOrderSummary] = useState<boolean>(true);
  const orderItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  

  const calculateTotal = () => {
    const subtotal =
      orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
      0;
    const shipping =
      shippingMethods.find((method) => method.id === selectedShipping)?.price ||
      0;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <Card className="backdrop-blur-sm bg-white/90 sticky top-6 shadow-xl rounded-xl border-t border-l border-white/20 overflow-hidden">
      <div
        className="bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setShowOrderSummary(!showOrderSummary)}
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
            {orderItems?.length} {orderItems?.length === 1 ? "item" : "items"}
          </span>
        </div>
        <ButtonBase
          variant="text"
          size="small"
          className="p-1 hover:bg-white/20"
          onClick={(e?: MouseEvent<HTMLButtonElement>) => {
            if (e) {
              e.stopPropagation();
            }
            setShowOrderSummary(!showOrderSummary);
          }}
        >
          {showOrderSummary ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </ButtonBase>
      </div>

      <AnimatePresence>
        {showOrderSummary && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                <AnimatePresence>
                  {orderItems?.map((item, i) => (
                    <motion.div
                      key={item.id}
                      custom={i}
                      variants={fadeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-md group-hover:scale-105 transition-transform">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex gap-5 items-center mt-1 text-sm text-muted-foreground">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="w-6 h-6 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                            disabled={item.quantity === 1}
                            onClick={() => {
                              dispatch(
                                updateCartQuantity({
                                  id: item.id,
                                  quantity: Math.max(1, item.quantity - 1),
                                })
                              );
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </motion.button>
                          <span className="mx-2 min-w-8 text-center">
                            Qty : {item.quantity || 1}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="w-6 h-6 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                            onClick={() => {
                              dispatch(
                                updateCartQuantity({
                                  id: item.id,
                                  quantity: Math.max(1, item.quantity + 1),
                                })
                              );
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </motion.button>
                        </div>
                        <p className="font-medium text-primary">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                      {item.id === 1 && (
                        <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          <span>Popular</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="pt-4 border-t">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 bg-muted/30 p-4 rounded-lg"
                >
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Subtotal
                    </span>
                    <span>${calculateTotal().subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Shipping
                    </span>
                    <span>${calculateTotal().shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-border/50">
                    <span className="flex items-center gap-2">
                      <Receipt className="h-4 w-4" />
                      Total
                    </span>
                    <span className="text-lg text-primary">
                      ${calculateTotal().total.toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Gift className="h-4 w-4 mr-2 text-primary" />
                    <span>Gift wrapping available</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default memo(OrderSummary);

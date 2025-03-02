import ButtonBase from "@Components/Button/Button";
import Card from "@mui/material/Card";
import React, { MouseEvent, useState } from "react";

import {
    BadgePercent,
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
// import { Pagination } from "@/components/order-history/Pagination";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  orderItems: OrderItem[];
  itemQuantities: Record<number, number>;
  updateQuantity: (id: number, delta: number) => void;
  shippingMethods: {
    id: string;
    price: number;
  }[];
  selectedShipping: string;
  couponCode: string;
  setCouponCode: (code: string) => void;
  showOrderSummary: boolean;
  setShowOrderSummary: (show: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderItems=[],
  itemQuantities=0,
  updateQuantity=0,
  shippingMethods=[],
  selectedShipping='',
  couponCode=null,
  setCouponCode=()=>{},
  showOrderSummary='',
  setShowOrderSummary=()=>{},
  currentPage=0,
  setCurrentPage=()=>{},
  itemsPerPage=0,
  totalItems=0,
}) => {
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

  const calculateTotal = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * (itemQuantities[item.id] || 1),0);
    const shipping =shippingMethods.find((method) => method.id === selectedShipping)?.price ||0;
    const discount = couponCode.toLowerCase() === "save10" ? subtotal * 0.1 : 0;
    return {
      subtotal,
      shipping,
      discount,
      total: subtotal + shipping - discount,
    };
  };

  const applyCoupon = () => {
    setIsApplyingCoupon(true);
    setTimeout(() => {
      if (couponCode.toLowerCase() === "save10") {
        toast.success("Coupon applied successfully! 10% discount added.", {
          icon: <BadgePercent className="h-5 w-5 text-green-500" />,
        });
      } else {
        toast.error("Invalid coupon code.", {
          icon: <BadgePercent className="h-5 w-5 text-red-500" />,
        });
      }
      setIsApplyingCoupon(false);
    }, 800);
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
            {orderItems.length} {orderItems.length === 1 ? "item" : "items"}
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
                  {orderItems
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item, i) => (
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
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              className="w-6 h-6 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </motion.button>
                            <span className="mx-2 min-w-8 text-center">
                              Qty: {itemQuantities[item.id] || 1}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              className="w-6 h-6 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-primary/10 transition-colors"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </motion.button>
                          </div>
                          <p className="font-medium text-primary">
                            $
                            {(
                              item.price * (itemQuantities[item.id] || 1)
                            ).toFixed(2)}
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

              {/* {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )} */}

              <div className="pt-4 border-t">
                <div className="flex items-center mb-4">
                  <ButtonBase
                    variant="text"
                    className="ml-2 hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={applyCoupon}
                    disabled={isApplyingCoupon}
                  >
                    {isApplyingCoupon ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : (
                      <BadgePercent className="h-4 w-4" />
                    )}
                  </ButtonBase>
                </div>

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
                  <AnimatePresence>
                    {calculateTotal().discount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex justify-between text-green-600"
                      >
                        <span className="flex items-center gap-2">
                          <BadgePercent className="h-4 w-4" />
                          Discount
                        </span>
                        <span>-${calculateTotal().discount.toFixed(2)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

export default OrderSummary;

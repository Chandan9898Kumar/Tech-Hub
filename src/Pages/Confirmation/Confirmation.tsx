import { Button } from "@Components/Button/ButtonHeader";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  PartyPopper,
  Share2,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { ConfettiEffect } from "./ConfettiEffect";
import { DeliveryInformation } from "./DeliveryInformation";
import { OrderSummary } from "./OrderSummary";
import { OrderTimeline } from "./OrderTimeline";
import { PaymentInformation } from "./PaymentInformation";
import { ShippingInformation } from "./ShippingInformation";
import { ConfirmationComponent } from "./Interface";
import { resetCart } from "../../Redux/AddToCart/AddToCart";
import { useAppDispatch } from "../../Redux/Store";
const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<ConfirmationComponent | null>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const dispatch= useAppDispatch()
  useEffect(() => {
    // Simulate loading and step progression
    const timer = setTimeout(() => {
      setLoaded(true);
      setShowConfetti(true);

      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      // Show toast notification
      toast.success("Order confirmed successfully!", {
        description: "We'll email you when your order ships.",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
    }, 800);

    if (location?.state) {
      setOrderData(location.state);
      dispatch(resetCart())
    }
    // Step progression animation
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < 4) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [location.state,dispatch]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-muted">
        <div className="text-center">
          <div className="mx-auto animate-spin w-12 h-12 border-t-2 border-b-2 border-primary rounded-full mb-4"></div>
          <p className="text-muted-foreground">Loading order information...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-primary/5 to-muted p-6 ${
        loaded ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <Toaster />
      <ConfettiEffect show={showConfetti} />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            className="hover:bg-primary/10 group transition-all duration-300"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
            <span className="group-hover:text-primary transition-colors">
              Continue Shopping
            </span>
          </Button>

          <Button
            variant="outline"
            className="hover:bg-primary/10 group transition-all duration-300"
            onClick={() => {
              toast.success("Order shared to your clipboard!");
            }}
          >
            <Share2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-primary transition-colors">
              Share Order
            </span>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute top-0 left-0 w-full h-full flex justify-center">
            <div className="w-40 h-40 bg-primary/10 rounded-full animate-pulse"></div>
          </div>
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              <PartyPopper className="h-16 w-16 text-primary mx-auto mb-4" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Thank you, {orderData.shippingAddress.fullName.split(" ")[0]}!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-muted-foreground"
            >
              Your order #{orderData.orderNumber} has been confirmed and will be
              processed shortly.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-5 flex gap-3 justify-center"
            >
              <Button
                size="sm"
                variant="outline"
                className="rounded-full hover:bg-primary/10 gap-1"
              >
                <ShoppingBag className="h-4 w-4 text-primary" />
                Track Order
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full hover:bg-primary/10 gap-1"
              >
                <Clock className="h-4 w-4 text-primary" />
                Order Support
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
        >
          <div className="col-span-1 md:col-span-4">
            <OrderTimeline
              activeStep={activeStep}
              orderDate={orderData.orderDate}
              estimatedDelivery={orderData.estimatedDelivery}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:col-span-2"
          >
            <OrderSummary
              items={orderData.items}
              subtotal={orderData.subtotal}
              shippingCost={orderData.shippingCost}
              tax={orderData.tax}
              total={orderData.total}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-6"
          >
            <ShippingInformation shippingAddress={orderData.shippingAddress} />
            <PaymentInformation paymentMethod={orderData.paymentMethod} />
            <DeliveryInformation
              shippingMethod={orderData.shippingMethod}
              estimatedDelivery={orderData.estimatedDelivery}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="max-w-md mx-auto mb-6">
            <p className="text-muted-foreground mb-4">
              We hope you enjoy your purchase! If you have any questions about
              your order, please contact our customer support team.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="group transition-transform hover:scale-105"
              onClick={() => navigate("/")}
            >
              <ShoppingBag className="mr-2 h-4 w-4 group-hover:animate-pulse" />
              Continue Shopping
            </Button>

            <Button
              variant="outline"
              className="group transition-transform hover:scale-105"
              onClick={() => navigate("/order-history")}
            >
              <Clock className="mr-2 h-4 w-4 group-hover:animate-pulse" />
              View Order History
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;

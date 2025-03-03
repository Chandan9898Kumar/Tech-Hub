import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, CreditCard, ShoppingBag, Truck, Timer, CircleDollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@Components/Card/Card";

interface OrderTimelineProps {
  activeStep: number;
  orderDate: string;
  estimatedDelivery: string;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ 
  activeStep, 
  orderDate,
  estimatedDelivery
}) => {
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Helper function to get estimated delivery date
  const getEstimatedDeliveryDate = () => {
    const date = new Date();
    // Add 3-5 days for standard shipping
    date.setDate(date.getDate() + 5);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card className="shadow-lg border-t border-l border-white/20 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6">
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary" />
          Order Timeline
        </CardTitle>
        <CardDescription>
          Track the progress of your order
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-[2px] bg-muted-foreground/20"></div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8 relative pl-12"
          >
            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${activeStep >= 1 ? 'bg-primary' : 'bg-muted-foreground/20'}`}>
              <CheckCircle2 className={`h-5 w-5 ${activeStep >= 1 ? 'text-white' : 'text-muted-foreground/50'}`} />
            </div>
            <div>
              <h3 className="font-medium text-lg">Order Confirmed</h3>
              <p className="text-muted-foreground">Your order has been received and is being processed</p>
              <p className="text-sm mt-1 flex items-center gap-1">
                <Calendar className="h-3 w-3 text-primary/80" />
                {formatDate(orderDate)}
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8 relative pl-12"
          >
            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${activeStep >= 2 ? 'bg-primary' : 'bg-muted-foreground/20'}`}>
              <CreditCard className={`h-5 w-5 ${activeStep >= 2 ? 'text-white' : 'text-muted-foreground/50'}`} />
            </div>
            <div>
              <h3 className="font-medium text-lg">Payment Processed</h3>
              <p className="text-muted-foreground">Your payment has been successfully processed</p>
              <p className="text-sm mt-1 flex items-center gap-1">
                <CircleDollarSign className="h-3 w-3 text-primary/80" />
                {formatDate(orderDate)}
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mb-8 relative pl-12"
          >
            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${activeStep >= 3 ? 'bg-primary' : 'bg-muted-foreground/20'}`}>
              <ShoppingBag className={`h-5 w-5 ${activeStep >= 3 ? 'text-white' : 'text-muted-foreground/50'}`} />
            </div>
            <div>
              <h3 className="font-medium text-lg">Order Preparation</h3>
              <p className="text-muted-foreground">Your order is being prepared for shipping</p>
              <p className="text-sm mt-1 flex items-center gap-1">
                <Timer className="h-3 w-3 text-primary/80" />
                Within 24 hours
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="relative pl-12"
          >
            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${activeStep >= 4 ? 'bg-primary' : 'bg-muted-foreground/20'}`}>
              <Truck className={`h-5 w-5 ${activeStep >= 4 ? 'text-white' : 'text-muted-foreground/50'}`} />
            </div>
            <div>
              <h3 className="font-medium text-lg">Shipping</h3>
              <p className="text-muted-foreground">Estimated delivery: {getEstimatedDeliveryDate()}</p>
              <p className="text-sm mt-1 flex items-center gap-1">
                <Calendar className="h-3 w-3 text-primary/80" />
                {estimatedDelivery}
              </p>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
import { memo, FC } from "react";
import { Card, CardContent, CardHeader } from "@Components/Card/Card";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CreditCard,
  MapPin,
  Truck,
  Smartphone,
  Apple,
  Wallet,
  User,
  Building,
  Mail,
  Calendar,
  Home,
  Hash,
} from "lucide-react";
import { FormDetail, ShippingMethod } from "./Interface";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
    },
  },
};

interface OrderConfirmationProps {
  formData: FormDetail;
  selectedPayment: string;
  selectedShipping: string;
  shippingMethods: ShippingMethod[];
}

const OrderConfirmation: FC<OrderConfirmationProps> = ({
  formData,
  selectedPayment,
  shippingMethods,
  selectedShipping,
}) => {
  const selectedShippingMethod = shippingMethods.find(
    (m) => m.id === selectedShipping
  );

  const getPaymentMethodInfo = (method: string) => {
    switch (method) {
      case "credit-card":
        return {
          name: "Credit Card",
          icon: <CreditCard className="h-5 w-5 text-primary" />,
          details: formData.cardNumber
            ? `Card ending in ${formData.cardNumber.slice(-4)}`
            : "",
        };
      case "paypal":
        return {
          name: "PayPal",
          icon: <Wallet className="h-5 w-5 text-primary" />,
          details: "Online payment service",
        };
      case "apple-pay":
        return {
          name: "Apple Pay",
          icon: <Apple className="h-5 w-5 text-primary" />,
          details: "Mobile payment service",
        };
      case "google-pay":
        return {
          name: "Google Pay",
          icon: <Smartphone className="h-5 w-5 text-primary" />,
          details: "Digital wallet platform",
        };
      default:
        return {
          name: "Other Payment Method",
          icon: <CreditCard className="h-5 w-5 text-primary" />,
          details: "",
        };
    }
  };

  const paymentInfo = getPaymentMethodInfo(selectedPayment);

  return (
    <motion.div
      className="space-y-6 animate-fade-in"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center space-x-2 mb-6"
        variants={itemVariants}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircle2 className="h-6 w-6 text-primary animate-pulse" />
        </motion.div>
        <motion.h2
          className="text-2xl font-semibold text-primary"
          variants={itemVariants}
        >
          Order Confirmation
        </motion.h2>
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-1">
        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden border-2 hover:border-primary/70 transition-all duration-300 group">
            <CardHeader className="bg-muted/30 flex flex-row items-center gap-2 p-4">
              <motion.div variants={iconVariants} whileHover="hover">
                <MapPin className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              </motion.div>
              <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                Shipping Address
              </h3>
            </CardHeader>
            <CardContent className="p-4 space-y-3 animate-[fade-in_0.5s_ease-out]">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 text-foreground"
              >
                <User className="h-4 w-4 text-primary/80" />
                <span className="font-medium text-muted-foreground">
                  Full Name :
                </span>
                <span className="font-medium">
                  {formData.firstName} {formData.lastName}
                </span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 text-foreground"
              >
                <Home className="h-4 w-4 text-primary/80" />
                <span className="font-medium text-muted-foreground">
                  Street Address :
                </span>
                <span>{formData.address}</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 text-foreground"
              >
                <Building className="h-4 w-4 text-primary/80" />
                <span className="font-medium text-muted-foreground">
                  City :
                </span>
                <span>{formData.city}</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 text-foreground"
              >
                <Hash className="h-4 w-4 text-primary/80" />
                <span className="font-medium text-muted-foreground">
                  Postal Code :
                </span>
                <span>{formData.postalCode}</span>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden border-2 hover:border-primary/70 transition-all duration-300 group">
            <CardHeader className="bg-muted/30 flex flex-row items-center gap-2 p-4">
              {paymentInfo.icon && (
                <motion.span
                  className="group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {paymentInfo.icon}
                </motion.span>
              )}
              <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                Payment Method
              </h3>
            </CardHeader>
            <CardContent className="p-4 space-y-2 animate-[fade-in_0.6s_ease-out]">
              <motion.p
                variants={itemVariants}
                className="font-medium text-foreground flex items-center gap-2"
              >
                {paymentInfo.name}
              </motion.p>
              {paymentInfo.details && (
                <motion.p
                  variants={itemVariants}
                  className="text-muted-foreground"
                >
                  {paymentInfo.details}
                </motion.p>
              )}
              {selectedPayment === "credit-card" && formData.expiryDate && (
                <motion.p
                  variants={itemVariants}
                  className="flex items-center gap-2 mt-1"
                >
                  <Calendar className="h-4 w-4 text-primary/80" />
                  <span>Expires : {formData.expiryDate}</span>
                </motion.p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden border-2 hover:border-primary/70 transition-all duration-300 group">
            <CardHeader className="bg-muted/30 flex flex-row items-center gap-2 p-4">
              <motion.div variants={iconVariants} whileHover="hover">
                <Truck className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              </motion.div>
              <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                Shipping Method
              </h3>
            </CardHeader>
            <CardContent className="p-4 space-y-2 animate-[fade-in_0.7s_ease-out]">
              <motion.p
                variants={itemVariants}
                className="font-medium text-foreground flex items-center gap-2"
              >
                {selectedShippingMethod?.name || "Standard Shipping"}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Mail className="h-4 w-4 text-primary/80" />
                <span>
                  Delivery in{" "}
                  {selectedShippingMethod?.eta || "3-5 business days"}
                </span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="mt-2 p-2 bg-muted/20 rounded-md text-sm text-primary font-medium"
              >
                Shipping Cost : $
                {selectedShippingMethod?.price.toFixed(2) || "4.99"}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default memo(OrderConfirmation);

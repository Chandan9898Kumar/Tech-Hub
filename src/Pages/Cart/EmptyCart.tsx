import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import ButtonBase from "@Components/Button/Button";
const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 py-12 bg-gradient-to-b from-purple-50 to-white flex justify-center items-center"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ShoppingCart className="mx-auto h-24 w-24 text-purple-300 mb-6" />
        </motion.div>
        <motion.h1
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your Cart is Empty
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Looks like you haven't added anything to your cart yet.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/">
            <ButtonBase className=" hover:from-purple-700 hover:to-blue-600 text-green shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Start Shopping
            </ButtonBase>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmptyCart;

import ButtonBase from "@Components/Button/Button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import CartTable from "@Components/Table/CartTable";
import { useAppSelector, useAppDispatch } from "../../Redux/Store";
import {
  updateCartQuantity,
  removeCartItem,
} from "../../Redux/AddToCart/AddToCart";
import { motion } from "framer-motion";

const Cart = () => {
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const removeItem = (id: number): void => {
    dispatch(removeCartItem(id));
  };
  const updateQuantity = (id: number, quantity: number): void => {
    dispatch(updateCartQuantity({ id, quantity }));
  };

  if (!items.length) {
    return <EmptyCart />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 py-8 bg-gradient-to-b from-purple-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ButtonBase
            variant="text"
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-white/50 transition-all duration-300 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Continue Shopping
          </ButtonBase>
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
        >
          Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100"
        >
          <CartTable
            items={items}
            onRemoveItem={removeItem}
            onUpdateQuantity={updateQuantity}
          />

          <motion.div
            className="mt-8 border-t border-purple-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-sm text-purple-600">Subtotal</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  ${totalAmount.toFixed(2)}
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonBase
                  className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  size="large"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </ButtonBase>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;

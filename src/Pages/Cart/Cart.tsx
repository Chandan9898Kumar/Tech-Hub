import ButtonBase from "@Components/Button/Button";
import Pagination from "@Components/Pagination/Pagination";
import CartTable from "@Components/Table/CartTable";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Lock, ShoppingCart } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartQuantity } from "../../Redux/AddToCart/AddToCart";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import EmptyCart from "./EmptyCart";
const buttonHoverVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.98,
  },
};
const Cart = () => {
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const [activePage, setActivePage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const removeItem = (id: number): void => {
    dispatch(removeCartItem(id));
  };
  const updateQuantity = (id: number, quantity: number): void => {
    dispatch(updateCartQuantity({ id, quantity }));
  };

  const ITEM_PER_PAGE = 3;
  const TOTAL_PAGE = Math.ceil(items?.length / ITEM_PER_PAGE) || 0;

  const paginatedItems = useMemo(() => {
    return items.slice(
      activePage * ITEM_PER_PAGE - ITEM_PER_PAGE,
      activePage * ITEM_PER_PAGE
    );
  }, [activePage, items]);

  // NOTE : The ITEM_PER_PAGE constant doesn't need to be included in the dependency array of useMemo because :-
  // 1. It's a constant value (3) defined outside the memoized function and doesn't change between renders.
  // 2. React's dependency system is primarily concerned with values that can change between renders.
  // 3. If ITEM_PER_PAGE was a state variable or a prop that could change, then it would need to be included in the dependency array.
  const handlePageChange = useCallback((value: number): void => {
    setActivePage(value);
  }, []);

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
          className="text-right text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mr-3"
          >
            <ShoppingCart className="h-8 w-8 text-purple-600" />
          </motion.span>
          Shopping Cart : {"  "}
          {items.length} {items.length === 1 ? "item" : "items"}
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100 h-[680px] overflow-hidden"
        >
          <CartTable
            items={paginatedItems}
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
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={totalAmount}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="w-8 text-center font-medium"
                    >
                      ${totalAmount.toFixed(2)}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>
              <motion.div
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={buttonHoverVariants}
              >
                <ButtonBase
                  className="w-full md:w-auto relative overflow-hidden group hover:from-purple-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                  size="large"
                  onClick={() => navigate("/checkout")}
                >
                  <motion.span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Lock className="h-5 w-5" />
                    </motion.div>
                    Proceed to Checkout
                  </span>
                </ButtonBase>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Pagination
        totalPage={TOTAL_PAGE}
        activePage={activePage}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
};

export default Cart;

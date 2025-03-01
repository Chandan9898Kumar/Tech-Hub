import ButtonBase from "@Components/Button/Button";
import { categoryItems } from "@Data/Data";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundView from "../../NotFound/NotFound";
import { addItemToCart } from "../../Redux/AddToCart/AddToCart";
import { useAppDispatch } from "../../Redux/Store";
import { cn } from "../../utils/cn";
import { Toaster, toast } from "sonner";
import { getCurrentDateTime } from "../../utils/Utils";
const { products } = categoryItems;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // NOTE Here, we did not put  products as a dependency in useMemo Because :
  // 1. products is likely coming from outside the component (like a constant or imported data)
  // 2. Changes to outer scope values don't trigger re-renders
  // 3. Therefore, including products in the dependency array is unnecessary
  const product = useMemo(() => {
    return products.find((p) => p.id === Number(id));
  }, [id]);

  if (!product) {
    return (
      <p className="text-lg text-gray-600">
        <NotFoundView />
      </p>
    );
  }

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...product, quantity }));
    toast(`Total ${quantity} items are added to cart.`, {
      description: getCurrentDateTime(),
    });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    // Math.max(1, prev - 1) is doing two things: [1]
    // First, it subtracts 1 from the previous quantity ( prev - 1)
    // Then it compares that result with 1 and returns the larger value
    // The key purpose is to prevent the quantity from going below 1.

    setQuantity((prev) => Math.max(1, prev - 1));

    // If current quantity is 3:
    // Math.max(1, 3 - 1) // Returns 2

    // If current quantity is 2:
    // Math.max(1, 2 - 1) // Returns 1

    // If current quantity is 1:
    // Math.max(1, 1 - 1) // Returns 1 (prevents going to 0)
  };

  // Animation variants
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  };

  const slideIn = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen px-4 py-8 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <Toaster />
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div {...slideIn} className="flex justify-left mt-5 mb-5">
          <ButtonBase
            size="medium"
            variant="text"
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100 transition-colors mt-5 mb-5"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </ButtonBase>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square w-full max-w-[600px] mx-auto"
          >
            <motion.div
              className={cn(
                "relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-lg",
                "transition-transform duration-300",
                isImageHovered && "shadow-xl"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onHoverStart={() => setIsImageHovered(true)}
              onHoverEnd={() => setIsImageHovered(false)}
            >
              <motion.img
                src={product?.image}
                alt={product?.name}
                className="h-full w-full object-cover object-center"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Product Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Product Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-gray-900"
            >
              {product?.name}
            </motion.h1>

            {/* Price */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-semibold text-purple-600"
            >
              ${product?.price.toFixed(2)}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg leading-relaxed text-gray-600 bg-purple-50 p-4 rounded-lg"
            >
              {product?.description}
            </motion.p>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl font-semibold text-gray-800"
              >
                Features
              </motion.h3>
              <ul className="space-y-4">
                {product?.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    }}
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                      backgroundColor: "#F9FAFB",
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg cursor-pointer"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.7 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="h-2 w-2 bg-purple-500 rounded-full mr-3"
                    />
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      {detail}
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Add to Cart Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-evenly gap-4 flex-wrap"
            >
              {/* Quantity Controls */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 border rounded-md p-1 bg-white shadow-sm"
              >
                <ButtonBase
                  variant="text"
                  size="small"
                  onClick={decreaseQuantity}
                  className="h-8 w-8 hover:bg-purple-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </ButtonBase>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={quantity}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="w-8 text-center font-medium"
                  >
                    {quantity}
                  </motion.span>
                </AnimatePresence>
                <ButtonBase
                  variant="text"
                  size="small"
                  onClick={increaseQuantity}
                  className="h-8 w-8 hover:bg-purple-50"
                >
                  <Plus className="h-4 w-4" />
                </ButtonBase>
              </motion.div>

              {/* Add to Cart Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonBase
                  onClick={handleAddToCart}
                  className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
                  size="large"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={quantity}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="w-8 text-center font-medium"
                    >
                      {quantity}
                    </motion.span>
                  </AnimatePresence>
                </ButtonBase>
              </motion.div>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 pt-8 border-t border-gray-200"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm text-gray-500">
                  <p>Category</p>
                  <p className="font-medium text-gray-900">
                    {product?.category}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Availability</p>
                  <p className="font-medium text-green-600">In Stock</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;

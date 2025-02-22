import Product from "@/Components/Product/Product";
import Pagination from "@Components/Pagination/Pagination";
import { categoryItems } from "@Data/Data";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { memo, MouseEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
const { products } = categoryItems;

interface ProductListProps {
  selectedCategory: string;
}

const ProductList = ({ selectedCategory }: ProductListProps) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<number>(1);
  const ITEM_PER_PAGE = 5;

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      return selectedCategory === "All" || item.category === selectedCategory;
    });
  }, [selectedCategory]);

  const TOTAL_PAGES = Math.ceil(filteredProducts.length / ITEM_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      activePage * ITEM_PER_PAGE - ITEM_PER_PAGE,
      activePage * ITEM_PER_PAGE
    );
  }, [ITEM_PER_PAGE, activePage, filteredProducts]);

  useEffect(() => {
    setActivePage(1);
  }, [selectedCategory]);

  const handleNavigation = (event: MouseEvent<HTMLDivElement>): void => {
    // Find the closest parent element with data-product attribute
    const productElement = (event.target as HTMLElement).closest("[data-product]");
    if (productElement) {
      const dataProduct = productElement.getAttribute("data-product");
      if (dataProduct) {
        const product = JSON.parse(dataProduct);
        navigate(`/products/${product.id}`);
      }
    }
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-left">Featured Products</h2>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        onClick={handleNavigation}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {paginatedProducts?.map((product, index) => (
          <motion.div
            key={product.id}
            className={`cursor-pointer hover:shadow-lg transition-shadow ${styles.product}`}
            data-product={JSON.stringify(product)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Product {...product} />
          </motion.div>
        ))}
      </motion.div>

      <Pagination
        totalPage={TOTAL_PAGES}
        itemPerPage={ITEM_PER_PAGE}
        activePage={activePage}
        onPageChange={setActivePage}
      />

      {/* No Products Found Message */}
      {!products?.length && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(ProductList);

// The difference between event.target and event.currentTarget is important for event handling in JavaScript/React: [1]

//                       event.target:

// Points to the actual element that triggered the event [2]

// Could be a nested child element that was clicked

// Changes based on which nested element was clicked

//                       event.currentTarget:

// Always refers to the element that the event listener is attached to

// Remains consistent regardless of which child element was clicked

// More reliable for event delegation



// Key differences:

// currentTarget always points to where the event handler is attached (grid)

// target points to the actual clicked element (could be img, h3, etc.)

// closest() searches up from the target element to find the nearest ancestor matching the selector

// When to use each:

// Use currentTarget when you need the element where the event handler is attached

// Use target when you need the exact element that was clicked

// Use closest() when you need to find a parent element with specific criteria

// In your case, closest() is the right choice because:

// It handles clicks on nested elements

// It finds the product container regardless of which part was clicked

// It works with event delegation

// It's more reliable for complex nested structures
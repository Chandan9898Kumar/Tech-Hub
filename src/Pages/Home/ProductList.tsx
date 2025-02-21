import { memo, useState, useMemo } from "react";
import { Search } from "lucide-react";
import Product from "@/Components/Product/Product";
import Pagination from "@Components/Pagination/Pagination";
import { categoryItems } from "@Data/Data";
const { products } = categoryItems;
const ProductList = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const TOTAL_PAGES = 10;
  const ITEM_PER_PAGE = products.length / TOTAL_PAGES;

  const paginatedProducts = useMemo(() => {
    return products.slice(
      activePage * ITEM_PER_PAGE - ITEM_PER_PAGE,
      activePage * ITEM_PER_PAGE
    );
  }, [ITEM_PER_PAGE, activePage]);
  
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-left">Featured Products</h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="animate-fade-in">
            <Product {...product} />
          </div>
        ))}
      </div>

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

import HeroSection from "./HeroSection";
import { useState } from "react";
import Category from "@/Components/Category/Category";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryClick = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <Category
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      {/* <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <Category
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />

        <Product
          products={paginatedProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div> */}
    </div>
  );
};

export default Home;

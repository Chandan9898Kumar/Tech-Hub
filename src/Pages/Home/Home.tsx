import { Suspense, lazy, useState, useCallback } from "react";
import ProgressBars from "../../Components/Loader/Loader";
const Category = lazy(() => import("@/Components/Category/Category"));
const HeroSection = lazy(() => import("./HeroSection"));
const ProductList = lazy(() => import("./ProductList"));

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleCategoryClick = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []); // No dependencies since it only uses setState

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Suspense fallback={<ProgressBars />}>
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <Suspense fallback={<ProgressBars />}>
          <Category
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
        </Suspense>

        <Suspense fallback={<ProgressBars />}>
          <ProductList selectedCategory={selectedCategory} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;

//  Waterfall Prevention Separate Suspense boundaries allow components to load in parallel rather than sequentially:

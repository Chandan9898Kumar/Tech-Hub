// Pages/Home/HeroSection.tsx
import { motion } from "framer-motion";
import { memo } from "react";

const HeroSection = () => {
  return (
    <div className="relative  mb-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7')",
          filter: "brightness(0.7)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90 dark:from-purple-900/95 dark:to-blue-900/95" />

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              TechHub
            </span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
            Discover premium tech products at unbeatable prices
          </p>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl mx-auto px-4"
        >
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl p-4">
            <SearchBar
              inputValue={searchQuery}
              onInputChange={onSearchChange}
              placeholder="Search for laptops, headphones, cameras..."
            />
            {searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm text-gray-200"
              >
                <p>Showing results for "{searchQuery}"</p>
              </motion.div>
            )}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default memo(HeroSection);

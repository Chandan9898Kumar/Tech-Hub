import { categoryItems } from "@Data/Data";
import { memo } from "react";
interface CategoryProps {
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

const Category = ({ selectedCategory, onCategoryClick }: CategoryProps) => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-left">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categoryItems?.categories.map(({ name, icon: Icon }) => (
          <div
            key={name}
            onClick={() => onCategoryClick(name)}
            className={`relative overflow-hidden rounded-xl cursor-pointer group ${
              (name === "All" && !selectedCategory) || selectedCategory === name
                ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
                : "bg-white text-gray-800 hover:shadow-xl"
            } p-6 transition-all duration-300 transform hover:scale-105 border border-gray-100`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex flex-col items-center gap-3">
              <div
                className={`p-3 rounded-full ${
                  (name === "All" && !selectedCategory) ||
                  selectedCategory === name
                    ? "bg-white/20"
                    : "bg-purple-50 group-hover:bg-purple-100"
                } transition-colors`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-center">{name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Category);

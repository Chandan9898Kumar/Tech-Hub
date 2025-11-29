import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useState, useEffect } from "react";

const StyleDiv = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px auto",
} as const;

interface PaginationProps {
  totalPage: number;
  itemPerPage?: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPage,
  activePage,
  onPageChange,
}) => {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  const next = (): void => {
    if (activePage <= 10) {
      onPageChange(activePage + 1);
    }
  };

  const prev = (): void => {
    if (activePage >= 1) {
      onPageChange(activePage - 1);
    }
  };

  return (
    <div className="flex items-center gap-8" style={StyleDiv}>
      <button
        onClick={prev}
        disabled={activePage === 1}
        className={`p-2 rounded border ${
          isDark
            ? "border-gray-600 text-gray-300 hover:bg-gray-800 disabled:text-gray-600"
            : "border-gray-400 text-gray-800 hover:bg-gray-50 disabled:text-gray-400"
        } transition-colors disabled:cursor-not-allowed`}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </button>
      <div
        className={`font-normal ${isDark ? "text-gray-300" : "text-gray-800"}`}
      >
        Page{" "}
        <strong className={isDark ? "text-grey" : "text-black"}>
          <AnimatePresence mode="wait">
            <motion.span
              key={activePage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-8 text-center font-medium"
            >
              {activePage}
            </motion.span>
          </AnimatePresence>
        </strong>{" "}
        of{" "}
        <strong className={isDark ? "text-grey" : "text-black"}>
          {totalPage}
        </strong>
      </div>
      <button
        onClick={next}
        disabled={activePage === totalPage}
        className={`p-2 rounded border ${
          isDark
            ? "border-gray-600 text-gray-300 hover:bg-gray-800 disabled:text-gray-600"
            : "border-gray-400 text-gray-800 hover:bg-gray-50 disabled:text-gray-400"
        } transition-colors disabled:cursor-not-allowed`}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
};

export default memo(Pagination);

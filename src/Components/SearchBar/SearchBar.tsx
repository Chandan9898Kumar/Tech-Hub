import { ChangeEvent, FC, useCallback } from "react";
import { memo } from "react";

interface SearchProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder: string;
}

const SearchBar: FC<SearchProps> = ({
  inputValue,
  onInputChange,
  placeholder,
}) => {
  
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onInputChange(event.target.value);
    },
    [onInputChange]
  );

  return (
    <input
      className="flex rounded-md border-input px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 pr-12 w-full h-14 text-lg bg-white/95 dark:bg-gray-900/90 backdrop-blur-xl border-2 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 shadow-lg hover:shadow-purple-500/10"
      type="search"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputChange}
      autoComplete="off"
      spellCheck="false"
      aria-label="Search products"
      data-testid="search-input"
      style={{
        color: "black",
        fontSize: "1.5rem",
        fontWeight: "500",
        letterSpacing: "1px",
      }}
    />
  );
};

export default memo(SearchBar);

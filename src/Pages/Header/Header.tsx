import { Button } from "@Components/Button/ButtonHeader";
import { History, Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import { useTheme } from "./ThemeProvider";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full backdrop-blur-lg dark:bg-opacity-90 border-b transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 shadow-sm border-gray-200 dark:border-gray-800' 
        : 'bg-white/80 dark:bg-gray-900/80 border-transparent'
    }`}>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
          >
            <ShoppingBag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              TechHub
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/order-history"
              className="relative group"
            >
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2 transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
              >
                <History className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative">
                  Orders
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-purple-600 dark:bg-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            
            <div className="transition-transform duration-300 hover:scale-105 ml-1">
              <CartButton />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-1 transition-all duration-300 hover:rotate-90 hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px] text-yellow-400" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <div className="transition-transform duration-300 hover:scale-105">
              <CartButton />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 animate-in zoom-in duration-300" />
              ) : (
                <Menu className="h-5 w-5 animate-in zoom-in duration-300" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-64 opacity-100 translate-y-0' 
          : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
      } overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg">
          <div className="flex flex-col items-center space-y-4 p-4">
            <Link to="/order-history" className="w-full" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-center gap-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-300"
              >
                <History className="h-5 w-5" />
                <span>Orders</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setIsMenuOpen(false);
              }}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span>Toggle {theme === "dark" ? "Light" : "Dark"} Mode</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
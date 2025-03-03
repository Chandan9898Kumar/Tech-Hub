import { Button } from "@Components/Button/ButtonHeader";

import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../Redux/Store";
const CartButton = () => {
  
  const itemCount = useAppSelector((state) => state.cart.totalQuantity) || 0;

  return (
    <Link to="/cart">
      <Button variant="ghost" size="icon" className="relative hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
        <ShoppingCart className="h-[18px] w-[18px]" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center animate-in zoom-in">
            {itemCount}
          </span>
        )}
        <span className="sr-only">View cart ({itemCount} items)</span>
      </Button>
    </Link>
  );
};

export default CartButton;
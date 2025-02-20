import { Laptop, Headphones, Package, Camera, ShoppingBag } from "lucide-react";

interface Category {
  id:number
  name: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  {id:1, name: "All", icon: ShoppingBag },
  { id:2,name: "Laptops", icon: Laptop },
  { id:3,name: "Audio", icon: Headphones },
  { id:4,name: "Accessories", icon: Package },
  { id:5,name: "Cameras", icon: Camera },
];

export const categoryItems = { categories };

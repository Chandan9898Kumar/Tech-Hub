import { Laptop, Headphones, Package, Camera, ShoppingBag } from "lucide-react";

interface Category {
  id: number;
  name: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { id: 1, name: "All", icon: ShoppingBag },
  { id: 2, name: "Laptops", icon: Laptop },
  { id: 3, name: "Audio", icon: Headphones },
  { id: 4, name: "Accessories", icon: Package },
  { id: 5, name: "Cameras", icon: Camera },
];

//  Products

export interface Products {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products:Products[] = [
  {
    id: 1,
    name: "Premium Laptop Pro",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "High-performance laptop with 16GB RAM, 512GB SSD, and dedicated GPU",
  },
  {
    id: 2,
    name: "Wireless Noise-Canceling Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Premium headphones with 30-hour battery life and active noise cancellation",
  },
  {
    id: 3,
    name: "4K Ultra Gaming Monitor",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    description: "27-inch 4K monitor with 144Hz refresh rate and HDR support",
  },
  {
    id: 4,
    name: "RGB Mechanical Keyboard",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    description: "Gaming keyboard with Cherry MX switches and customizable RGB",
  },
  {
    id: 5,
    name: "Pro Gaming Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    description: "16000 DPI gaming mouse with programmable buttons",
  },
  {
    id: 6,
    name: "Smart Watch Elite",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    description: "Advanced fitness tracking with ECG and sleep monitoring",
  },
  {
    id: 7,
    name: "Gaming Console X",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128",
    description: "Next-gen gaming with 4K graphics and ray tracing",
  },
  {
    id: 8,
    name: "Pro Wireless Earbuds",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    description: "True wireless earbuds with noise cancellation and Bluetooth 5.0",
  },
  {
    id: 9,
    name: "4K Webcam Pro",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1587826080692-de9ba96a5f65",
    description: "Professional webcam with 4K resolution and auto-focus",
  },
  {
    id: 10,
    name: "1TB Portable SSD",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58",
    description: "Ultra-fast portable SSD with USB-C connectivity",
  },
  {
    id: 11,
    name: "RTX Graphics Card",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146",
    description: "High-end GPU with 12GB VRAM and ray tracing",
  },
  {
    id: 12,
    name: "Gaming Chair Deluxe",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1616627052149-22c4f8a6316e",
    description: "Ergonomic chair with lumbar support and adjustable armrests",
  },
  {
    id: 13,
    name: "Studio Microphone",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    description: "Professional USB microphone for streaming and recording",
  },
  {
    id: 14,
    name: "Mesh WiFi System",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    description: "Tri-band mesh WiFi system with wide coverage",
  },
  {
    id: 15,
    name: "20000mAh Power Bank",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1609592424825-fe0d0dd6e374",
    description: "High-capacity power bank with fast charging",
  },
  {
    id: 16,
    name: "Curved Gaming Monitor",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1527443195645-1133f7f28990",
    description: "34-inch curved monitor with ultrawide display",
  },
  {
    id: 17,
    name: "Wireless Gaming Controller",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48",
    description: "Premium controller with customizable buttons",
  },
  {
    id: 18,
    name: "Smart Home Hub",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126",
    description: "Central hub for smart home device control",
  },
  {
    id: 19,
    name: "Mechanical Keyboard Mini",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212",
    description: "60% form factor with hot-swappable switches",
  },
  {
    id: 20,
    name: "4TB External HDD",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58",
    description: "Large capacity external drive for backup",
  },
  {
    id: 21,
    name: "Premium Laptop Stand",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37",
    description: "Adjustable aluminum laptop stand with cooling",
  },
  {
    id: 22,
    name: "Wireless Charging Pad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3",
    description: "Fast wireless charging with LED indicators",
  },
  {
    id: 23,
    name: "Gaming Mouse Pad XL",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1588200908342-23b585c03e26",
    description: "Extended mouse pad with RGB edges",
  },
  {
    id: 24,
    name: "USB-C Hub",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1610066708549-574b9b677185",
    description: "7-in-1 USB-C hub with 4K HDMI output",
  },
  {
    id: 25,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    description: "Portable speaker with 360-degree sound",
  },
  {
    id: 26,
    name: "Laptop Cooling Pad",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
    description: "Laptop cooler with 4 fans and LED display",
  },
  {
    id: 27,
    name: "Cable Management Kit",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1586776977608-d2c72dcc0d8b",
    description: "Complete cable organization solution",
  },
  {
    id: 28,
    name: "Vertical Mouse",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    description: "Ergonomic vertical mouse for comfort",
  },
  {
    id: 29,
    name: "Mini PC",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2b",
    description: "Compact desktop PC with SSD storage",
  },
  {
    id: 30,
    name: "Desk Lamp with Wireless Charging",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1534281368625-1c90d3949c1b",
    description: "LED desk lamp with built-in wireless charger",
  },
  {
    id: 31,
    name: "Wireless Keyboard and Mouse Combo",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    description: "Wireless desktop combo with long battery life",
  },
  {
    id: 32,
    name: "USB Microphone Stand",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
    description: "Adjustable microphone stand with shock mount",
  },
  {
    id: 33,
    name: "Gaming Headset Stand",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae",
    description: "RGB headset stand with USB ports",
  },
  {
    id: 34,
    name: "Laptop Privacy Screen",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8",
    description: "Privacy filter for 15.6-inch laptops",
  },
  {
    id: 35,
    name: "Webcam Ring Light",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
    description: "10-inch ring light with phone holder",
  },
  {
    id: 36,
    name: "Mini Bluetooth Keyboard",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    description: "Compact wireless keyboard for tablets",
  },
  {
    id: 37,
    name: "USB Fan",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    description: "Quiet USB powered desk fan",
  },
  {
    id: 38,
    name: "Laptop Sleeve",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    description: "Water-resistant sleeve for 15-inch laptops",
  },
  {
    id: 39,
    name: "Cable Clips",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1586776977608-d2c72dcc0d8b",
    description: "Self-adhesive cable management clips",
  },
  {
    id: 40,
    name: "Screen Cleaning Kit",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1586776977608-d2c72dcc0d8b",
    description: "Complete screen cleaning solution",
  },
  {
    id: 41,
    name: "Wireless Presenter",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586776977608-d2c72dcc0d8b",
    description: "Presentation remote with laser pointer",
  },
  {
    id: 42,
    name: "Monitor Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
    description: "Adjustable monitor stand with storage",
  },
  {
    id: 43,
    name: "Desk Mat",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1588200908342-23b585c03e26",
    description: "Large desk mat for keyboard and mouse",
  },
  {
    id: 44,
    name: "Phone Stand",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1586776977608-d2c72dcc0d8b",
    description: "Adjustable phone holder for desk",
  },
  {
    id: 45,
    name: "Laptop Riser",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
    description: "Portable laptop stand for better ergonomics",
  },
  {
    id: 46,
    name: "Wireless Numeric Keypad",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    description: "Bluetooth numeric keypad for laptops",
  },
  {
    id: 47,
    name: "Monitor Light Bar",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1534281368625-1c90d3949c1b",
    description: "Screen-mounted LED light bar",
  },
  {
    id: 48,
    name: "USB Audio Interface",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
    description: "2-channel audio interface for recording",
  },
  {
    id: 49,
    name: "Desk Cable Grommet",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1586776977608-d2c72dcc0d8b",
    description: "Cable management grommet for desk",
  },
  {
    id: 50,
    name: "Laptop Docking Station",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1591815302525-756a9bcc3425",
    description: "Universal laptop docking station with multiple ports",
  },
  {
    id: 51,
    name: "MacBook Pro M2",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Apple MacBook Pro with M2 chip, 16GB RAM, 512GB SSD"
  },
  {
    id: 52,
    name: "Dell XPS 13",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
    description: "Premium ultrabook with 4K display and Intel i7 processor"
  },
  {
    id: 53,
    name: "ThinkPad X1 Carbon",
    price: 1399.99,
    image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0",
    description: "Business laptop with excellent keyboard and build quality"
  },
  {
    id: 54,
    name: "HP Spectre x360",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f",
    description: "Convertible laptop with OLED display and stylus support"
  },
  {
    id: 55,
    name: "ASUS ROG Zephyrus",
    price: 1799.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    description: "Gaming laptop with RTX 4070 and AMD Ryzen 9"
  },
  {
    id: 56,
    name: "Sony WH-1000XM4",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    description: "Premium noise-cancelling headphones with exceptional sound"
  },
  {
    id: 57,
    name: "AirPods Pro",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1588156979435-379b54233077",
    description: "Wireless earbuds with active noise cancellation"
  },
  {
    id: 58,
    name: "JBL Flip 6",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1608043152269-423129d45d81",
    description: "Portable Bluetooth speaker with waterproof design"
  },
  {
    id: 59,
    name: "Bose SoundLink Revolve+",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1608043152269-423129d45d81",
    description: "360-degree Bluetooth speaker with rich sound"
  },
  {
    id: 60,
    name: "Sennheiser HD 660S",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440",
    description: "Professional open-back headphones for audiophiles"
  },
  {
    id: 61,
    name: "Logitech MX Master 3",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    description: "Advanced wireless mouse for productivity"
  },
  {
    id: 62,
    name: "Samsung T7 SSD",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
    description: "1TB portable SSD with fast transfer speeds"
  },
  {
    id: 63,
    name: "Anker USB-C Hub",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4c9",
    description: "7-in-1 USB-C adapter with multiple ports"
  },
  {
    id: 64,
    name: "Keychron K2",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3282ba",
    description: "Wireless mechanical keyboard with RGB backlight"
  },
  {
    id: 65,
    name: "LG 27GP950",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    description: "27-inch 4K gaming monitor with 144Hz refresh rate"
  },
  {
    id: 66,
    name: "Sony A7 IV",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    description: "Full-frame mirrorless camera with advanced features"
  },
  {
    id: 67,
    name: "Canon EOS R6",
    price: 2299.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
    description: "Professional mirrorless camera for photo and video"
  },
  {
    id: 68,
    name: "DJI Air 2S",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f",
    description: "Drone with 1-inch sensor and 5.4K video capability"
  },
  {
    id: 69,
    name: "GoPro Hero 11",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054",
    description: "Action camera with HyperSmooth stabilization"
  },
  {
    id: 70,
    name: "Fujifilm X-T5",
    price: 1699.99,
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
    description: "Premium mirrorless camera with retro design"
  }
];


export const categoryItems = { categories, products };

import { Product } from "@/types/shop";

export const products: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Headphones",
    price: 29999,
    rating: 5,
    stock: "in-stock",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
  },
  {
    id: "2",
    name: "JBL Flip 6 Portable Speaker",
    category: "Speakers",
    price: 9999,
    rating: 4,
    stock: "in-stock",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
  },
  // ... aur products add karo
];

export const categories: string[] = [
  "Headphones",
  "Speakers",
  "Earbuds",
  "Smartwatches",
  "Chargers",
];
export interface Product {
  id: string;

  title?: string;

  slug?: {
    current: string;
  };

  images: string[];

  description?: string;

  price?: number;

  discount?: number;

  stock?: number;

  status?: "new" | "hot" | "sale";

  isFeatured?: boolean;

  averageRating?: number;

  totalReviews?: number;

  variant?: "gadget" | "appliances" | "refrigerators" | "others";
}
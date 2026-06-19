import { Title } from "@/components/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Flame, Heart, Loader2, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";

interface ProductCardProps {
  product: Product;
}

interface Product {
  id: number;
  title: string;
  thumbnail?: string;
  images?: string[];
  category?: string;
  rating?: number;
  stock?: number;
  price?: number;
  discountPercentage?: number;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group overflow-hidden rounded-xl border border-dark-blue/20 bg-white text-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative overflow-hidden bg-shop_light_bg aspect-square sm:h-64">
        {product?.images && (
          <Link href={`/product/${product.title}`}>
            <Image
              src={product.images[0]}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-contain transition-transform duration-500 ${
                product.stock !== 0 ? "group-hover:scale-105" : "opacity-50"
              }`}
              alt={product.title}
            />
          </Link>
        )}

        {/* Wishlist */}
        <AddToWishListButton product={product} />

        {/* Sale Badge */}
        {product?.discountPercentage && product.discountPercentage > 10 && (
          <span
            className="
              absolute left-2 top-2
              rounded-full bg-black
              px-2 py-1
              text-[10px] font-medium text-white
              sm:left-3 sm:top-3 sm:px-2.5 sm:text-[11px]"
          >
            Sale
          </span>
        )}

        {/* Hot Badge */}
        {product?.rating && product.rating > 4.5 && (
          <Link
            href="/deal"
            className="
                absolute right-3 top-3
                flex h-8 w-8 items-center
                justify-center rounded-full
                bg-orange-100
                transition-colors
                hover:bg-orange-200
              "
          >
            <Flame size={15} className="text-orange-500" />
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-3 sm:p-4">
        {/* Category */}
        {product?.category && (
          <p className="line-clamp-1 text-[10px] font-medium uppercase text-light-text sm:text-xs">
            {product?.category}
          </p>
        )}

        {/* Title */}
        <Title className="line-clamp-2 text-xs sm:text-sm">
          {product?.title}
        </Title>

        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center">
            {renderStars(product?.rating || 0)}
          </div>

          <span className="text-xs text-gray-500">
            ({product?.rating || 0})
          </span>
        </div>

        {/* Stock */}
        <p className="text-xs text-gray-500">
          Stock:{" "}
          <span
            className={
              product?.stock && product.stock > 0
                ? "font-medium text-green-600"
                : "font-medium text-red-500"
            }
          >
            {product?.stock && product.stock > 0
              ? product.stock
              : "Out of stock"}
          </span>
        </p>

        {/* Price */}
        <PriceView
          price={product?.price}
          discount={product?.discountPercentage}
          className="text-xs sm:text-sm"
        />

        {/* Cart */}
        <AddToCartButton product={product} className="mt-1 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;

// AddToWishListButton
interface WishListButtonProps {
  product: Product;
  className?: string;
}
const AddToWishListButton = ({ product, className }: WishListButtonProps) => {
  const handleWishlist = () => {
    console.log(product);
    // addToWishlist(product)
  };
  return (
    <div
      className={cn(
        "absolute right-2 top-2 z-10 sm:right-3 sm:top-3",
        className,
      )}
    >
      <button
        onClick={handleWishlist}
        aria-label="Add to wishlist"
        className="flex h-8 w-8 items-center justify-center
          rounded-full bg-white/90 backdrop-blur-sm
          shadow-sm transition-all duration-300
          hover:scale-110 hover:bg-shop_dark_green
        hover:text-white active:scale-95
          sm:h-9 sm:w-9"
      >
        <Heart size={16} className="transition-colors duration-300" />
      </button>
    </div>
  );
};

/* Rating Stars */
const renderStars = (rating: number) => {
  return Array.from({
    length: 5,
  }).map((_, i) => {
    const filled = i < Math.round(rating);

    return (
      <Star
        key={i}
        size={14}
        className={filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    );
  });
};

// PriceView
interface PriceViewProp {
  price?: number;
  discount?: number;
  className?: string;
}
const PriceView = ({ price = 0, discount = 0, className }: PriceViewProp) => {
  const originalPrice = discount > 0 ? price / (1 - discount / 100) : null;

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      {/* Current Price */}
      <PriceFormatter
        amount={price}
        className="font-semibold text-shop_dark_green"
      />

      {/* Original Price */}
      {originalPrice && (
        <PriceFormatter
          amount={originalPrice}
          className="text-sm font-normal text-gray-400 line-through"
        />
      )}

      {/* Discount Badge */}
      {discount > 0 && (
        <span
          className="
            rounded-full bg-green-100
            px-2 py-0.5
            text-xs font-medium
            text-green-700
          "
        >
          -{Math.round(discount)}%
        </span>
      )}
    </div>
  );
};

// PriceFormatter
interface PriceFormatterProps {
  amount?: number;
  className?: string;
}

const PriceFormatter = memo(
  ({ amount = 0, className }: PriceFormatterProps) => {
    const formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);

    return (
      <span className={cn("text-sm font-semibold text-dark-color", className)}>
        {formattedPrice}
      </span>
    );
  },
);

PriceFormatter.displayName = "PriceFormatter";

// AddToCartButton
interface CartButtonProps {
  product: Product;
  className?: string;
}
const AddToCartButton = ({ product, className }: CartButtonProps) => {
  const [loading, setLoading] = useState(false);
  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;

    try {
      setLoading(true);

      // Fake API delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      console.log("Added to cart:", product);
    } catch (error) {
      console.error("Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={isOutOfStock || loading}
      onClick={handleAddToCart}
      aria-label="Add product to cart"
      className={cn(
        `
      h-9 w-full rounded-full
      text-xs font-semibold

      sm:h-10 sm:text-sm

      border border-shop_btn_dark_green
      bg-shop_btn_dark_green/90
      text-shop_light_bg
      transition-all duration-300
      hover:bg-shop_dark_green
      hover:text-white
    `,
        className,
      )}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />

          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </>
      )}
    </Button>
  );
};

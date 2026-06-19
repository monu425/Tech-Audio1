import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Grid3X3, Package, Search } from "lucide-react";
import Link from "next/link";

interface Props {
  selectedTab?: string;
  className?: string;
}

const NoProductAvailable = ({ selectedTab, className }: Props) => {
  const categoryName = selectedTab?.replace(/-/g, " ");
  return (
    <div
      className={cn(
        `
          flex min-h-[320px] w-full flex-col
          items-center justify-center
          rounded-2xl border border-gray-200/60
          bg-gradient-to-br from-gray-50 to-white
          px-6 py-16 text-center
          shadow-sm
        `,
        className,
      )}
    >
      {/* Icon */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="relative"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-shop_light_green/10 to-shop_light_green/20">
          <Package className="h-10 w-10 text-shop_light_green/70" />
        </div>

        <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
          <Search className="h-3.5 w-3.5 text-gray-400" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
          duration: 0.4,
        }}
        className="mt-7 space-y-3"
      >
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          No Products Found
        </h2>

        <p className="mx-auto max-w-md text-sm leading-6 text-gray-500">
          We couldn&apos;t find any products{" "}
          {categoryName && (
            <>
              in the{" "}
              <span className="font-semibold capitalize text-shop_dark_green">
                {categoryName}
              </span>{" "}
              category
            </>
          )}
          . This category may currently be out of stock.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.4,
        }}
        className="mt-8 w-full max-w-md"
      >
        <p className="mb-4 text-sm font-medium text-gray-500">
          Explore more options
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {/* Browse Products */}
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-shop_light_green px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-shop_dark_green hover:shadow-lg"
          >
            <Grid3X3 className="h-4 w-4" />
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Categories */}
          <Link
            href="/category"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-shop_light_green px-5 py-3 text-sm font-medium text-shop_light_green transition-all duration-300 hover:bg-shop_light_green hover:text-white"
          >
            <Package className="h-4 w-4" />
            View Categories
          </Link>
        </div>

        {/* Bottom Note */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <p className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Search className="h-3 w-3" />
            Try browsing other categories
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NoProductAvailable;

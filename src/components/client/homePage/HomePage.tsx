"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  BatteryCharging,
  Cable,
  Clock,
  CreditCard,
  Ear,
  Headphones,
  Loader2,
  Package,
  Plug,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productType } from "@/types/data";
import ProductCard from "@/components/commonFile/productComponent/ProductCard";
import NoProductAvailable from "@/components/commonFile/productComponent/NoProductAvailable";
import { fetchProducts } from "@/allQueries";
import { Title } from "@/components/text";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      {/* carouselbar */}
      <CarouselBar />

      {/* FeaturesBar */}
      <FeaturesBar />

      {/* ProductGrid */}
      <ProductGrid />

      {/* Category bar */}
      <CategoryBar />
    </>
  );
};

export default HomePage;

// carouselbar
const CarouselBar = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  const count = api?.scrollSnapList().length ?? 0;

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    handleSelect(); // initial value

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative max-w-7xl mx-auto">
      <Carousel setApi={setApi} opts={{ loop: true }} className="py-4 px-2">
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((i) => (
            <CarouselItem key={i}>
              <div className="h-[200px] sm:h-[300px] md:h-[350px] bg-gray-200 rounded-2xl flex items-center justify-center">
                Slide {i}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              current === i ? "w-4 bg-black" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// FeaturesBar
const items = [
  {
    icon: <Truck size={22} />,
    title: "Free Shipping",
    desc: "On all orders over ₹999",
  },
  {
    icon: <CreditCard size={22} />,
    title: "Flexible Payment",
    desc: "Secure & multiple options",
  },
  {
    icon: <Clock size={22} />,
    title: "Fast Delivery",
    desc: "Within 2-3 working days",
  },
  {
    icon: <Headphones size={22} />,
    title: "24/7 Support",
    desc: "We’re here to help",
  },
];
const FeaturesBar = () => {
  return (
    <section className="mt-8 border-y bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-2  lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="group flex items-center justify-center gap-4 px-2 py-5 transition-all duration-300 hover:bg-gray-200"
          >
            {/* Icon */}
            <div className="flex h-11 w-11  items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-colors duration-300 group-hover:bg-shop_dark_green ">
              {item.icon}
            </div>

            {/* Text */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ProductGrid

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // db fetch later
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchProducts(selectedTab);
        setProducts(data || []);
      } catch (error) {
        console.error(error);

        setError("Failed to load products");

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedTab]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Tabs */}
      <ProductNav selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {/* Loading */}
      {loading ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-gray-50 py-20">
          <Loader2 className="h-7 w-7 animate-spin text-shop_dark_green" />

          <span className="text-sm text-gray-500">Loading products...</span>
        </div>
      ) : error ? (
        /* Error */
        <div className="mt-10 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
          {error}
        </div>
      ) : products.length ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              mt-10 grid gap-5
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
            "
          >
            {products.slice(0, 8).map((product) => (
              <motion.div
                key={product.id}
                layout
                whileHover={{
                  y: -4,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </section>
  );
};

// ProductNav
interface ProductNavProps {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const ProductNav = ({ selectedTab, onTabSelect }: ProductNavProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {productType?.map((item) => {
          const active = selectedTab === item.title;

          return (
            <button
              key={item.title}
              onClick={() => onTabSelect(item.title)}
              className={`
                whitespace-nowrap rounded-full border
                px-4 py-2 text-sm font-medium
                transition-all duration-200
                active:scale-95
                ${
                  active
                    ? "border-black bg-black text-white shadow-sm"
                    : "border-gray-200 bg-gray-100 text-gray-600 hover:border-black hover:bg-black hover:text-white"
                }
              `}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      {/* See All */}
      <Link
        href="/shop"
        className="inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
      >
        See All →
      </Link>
    </div>
  );
};


// categories
const categories = [
  {
    key: 0,
    title: "Cables",
    value: "cables",
    icon: <Cable size={22} />,
  },
  {
    key: 1,
    title: "Audio",
    value: "audio",
    icon: <Headphones size={22} />,
  },
  {
    key: 2,
    title: "Chargers",
    value: "chargers",
    icon: <Plug size={22} />,
  },
  {
    key: 3,
    title: "Power Banks",
    value: "powerbanks",
    icon: <BatteryCharging size={22} />,
  },
  {
    key: 4,
    title: "Earbuds",
    value: "earbuds",
    icon: <Ear size={22} />,
  },
  {
    key: 5,
    title: "Accessories",
    value: "accessories",
    icon: <Package size={22} />,
  },
];

// CategoryBar
const CategoryBar = () => {
  return (
    <section className="">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-2">
          <Title className="text-2xl lg:text-3xl font-bold text-dark-color">
            Shop by Category
          </Title>
        </div>
        <p className="text-light-color text-md max-w-2xl mx-auto">
          Explore our most popular product categories and find what you need
        </p>
        <Link
          href="/category"
          className="inline-flex items-center gap-2 mt-4 rounded-full border-2 border-shop_orange bg-shop_light_pink px-8 py-3 font-semibold text-shop_dark_green transition-all duration-300 hover:bg-shop_orange"
        >
          {" "}
          Explore All Categories <span>→</span>
        </Link>
      </div>

      {/* Categories */}
      <div className="bg-gradient-to-br from-shop_light_bg via-white to-shop_light_pink p-5 lg:p-12 rounded-3xl shadow-xl border border-shop_light_green/20 mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((item, index) => (
            <CategoryView
              key={item.key}
              index={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </div>
        {/* Categories Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-shop_light_blue/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-shop_dark_blue">
              {categories?.length}+
            </div>
            <div className="text-sm text-light-color">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-shop_dark_blue">1000+</div>
            <div className="text-sm text-light-color">Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-shop_dark_blue">24/7</div>
            <div className="text-sm text-light-color">Support</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-shop_light_pink to-shop_light_bg rounded-2xl border border-shop_light_blue/20">
            <div className="w-2 h-2 bg-shop_light_green rounded-full animate-pulse"></div>
            <span className="text-dark-text font-medium">
              Discover amazing products in every category
            </span>
            <div className="w-2 h-2 bg-shop_light_green rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface CategoryViewProps {
  index: number;
  title: string;
  value: string;
  icon: React.ReactNode;
}

const CategoryView = ({ index, title, value, icon }: CategoryViewProps) => {
  return (
    <Link
      href={`/category/${value}`}
      className="group flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-shop_dark_green hover:shadow-lg"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Icon */}
      <div
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-shop_light_green/10 text-shop_dark_green transition-all duration-300 group-hover:bg-shop_dark_green "
      >
        {icon}
      </div>

      {/* Content */}
      <div>
        <h3
          className="text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-shop_dark_green"
        >
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500 capitalize">
          Explore products
        </p>
      </div>
    </Link>
  );
};

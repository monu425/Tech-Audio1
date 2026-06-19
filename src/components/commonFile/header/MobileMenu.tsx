"use client"

import { useOutsideClick } from "@/types";
import { AlignLeft, CircleQuestionMark, Flame, Grid3x3, Home, Info, Phone, ShoppingBag, Tag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../Logo";
import Link from "next/link";
import SocialMedia from "../SocialMedia";

const headerData = [
  { title: "Home", href: "/", icon: <Home size={18} /> },
  { title: "Shop", href: "/shop", icon: <ShoppingBag size={18} /> },
  { title: "Categories", href: "/category", icon: <Grid3x3 size={18} /> },
  { title: "Brands", href: "/brands", icon: <Tag size={18} /> },
  { title: "Hot Deal", href: "/deal", icon: <Flame size={18} /> },
];

const supports = [
  {
    title: "Help Center",
    href: "/help-center",
    icon: <CircleQuestionMark size={18} />,
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    icon: <Phone size={18} />,
  },
  {
    title: "About Us",
    href: "/about-us",
    icon: <Info size={18} />,
  },
];

const MobileMenu = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsSideMenuOpen(true)}>
        <AlignLeft className="md:hidden cursor-pointer" />
      </button>
      {isSideMenuOpen && (
        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      )}
    </>
  );
};


export default MobileMenu;



// SideMenu

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}


const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
    const pathname = usePathname();

  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <>
      <div
        className={`fixed inset-0 z-998  transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-70 bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div ref={sidebarRef} className="h-full overflow-hidden bg-white">
          <div className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-5">
            <Logo />

            <button
              onClick={onClose}
              className="hoverEffect hover:text-shop_green"
            >
              <X />
            </button>
          </div>

          <div className="flex h-[calc(100vh-80px)] flex-col gap-6 overflow-y-auto p-5">
            <MenuBar
              title="Navigation"
              items={headerData}
              pathname={pathname}
            />

            <MenuBar title="Support" items={supports} pathname={pathname} />

            <div className="mt-auto">
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



// MenuBar 

interface MenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface MenuBarProps {
  title: string;
  items: MenuItem[];
  pathname: string;
}

const MenuBar = ({ title, items, pathname, }: MenuBarProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
        {title}
      </h3>

      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${pathname === item.href
              ? "bg-gray-100 text-shop_light_green"
              : "text-gray-700"
            }`}
        >
          <span className="mr-3">{item.icon}</span>
          {item.title}
        </Link>
      ))}
    </div>
  );
};
"use client";

import { usePathname } from "next/navigation";
import Container from "../Container";
import Logo from "../Logo";
import MobileMenu from "./MobileMenu";
import { headerData } from "@/types/data";
import Link from "next/link";
import { Heart, LogIn, ShoppingBag } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SearchBar from "./SearchBar";

const ClientHeader = () => {
  return (
    <header className="sticky top-0 z-50 py-2 sm:py-3 lg:py-4 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <Container className="flex h-full items-center justify-between text-light-color">
        <div className="flex items-center gap-2 md:w-1/3">
          <MobileMenu />
          <Logo />
        </div>

        {/* Center */}
        <HeaderMenu />

        <div className="flex items-center justify-end gap-5 md:w-1/3">
          <div className="flex-shrink-0">
            <SearchBar />
          </div>
          <CartIcon />
          <FavoriteButton />
          <SignIn />
        </div>
      </Container>
    </header>
  );
};

export default ClientHeader;

// header menu
const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:inline-flex w-1/3 items-center justify-center gap-7 text-sm capitalize font-semibold text-light-color">
      {headerData.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`hover:text-red-500 hoverEffect relative group ${pathname === item.href && "text-red-500"}`}
        >
          {" "}
          {/* todo color change */}
          {item.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-500 group-hover:w-1/2 hoverEffect group-hover:left-0 ${pathname === item.href && "w-1/2"}`}
          ></span>
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-red-500 group-hover:w-1/2 hoverEffect group-hover:right-0 ${pathname === item.href && "w-1/2"}`}
          ></span>
        </Link>
      ))}
    </div>
  );
};



// cart icon
const CartIcon = () => {
  return (
    <Link href="/cart" className="group relative">
      <ShoppingBag className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white w-3.5 h-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        0
      </span>
    </Link>
  );
};

// favorite button
const FavoriteButton = () => {
  return (
    <Link href="/cart" className="group relative">
      <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white w-3.5 h-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        0
      </span>
    </Link>
  );
};

const SignIn = () => {
  //   const {user} = useAuth()
  const user = "";

  // Random avatar fallback
  const avatar =
    user || //user?.avatar
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      "User", //user?.name || "User"
    )}&background=random`;

  // If logged in
  return (
    <Link
      href={`${user ? "" : "/login"}`}
      className="text-sm font-semibold hover:text-darkColor text-lightColor hover:cursor-pointer hoverEffect"
    >
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button style={{ background: "none", padding: "0" }}>
              <Image
                src={avatar}
                alt={"hlo"} //user?.name
                width={20}
                height={20}
                className="h-7 w-7 lg:h-9 lg:w-9 rounded-full object-cover border"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <span className="hidden md:inline">Login</span>

          <span className="md:hidden">
            <LogIn />
          </span>
        </>
      )}
    </Link>
  );
};

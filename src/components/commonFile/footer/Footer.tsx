"use client"

import Container from "../Container"

import { AlertCircle, CheckCircle2, Clock, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import Logo from "../Logo";
import { SubText } from "@/components/text";
import SocialMedia from "../SocialMedia";
import { categoriesData, quickLinksData } from "@/types/data";
import Link from "next/link";
import { useState } from "react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href?: string;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle:
      "123 Shopping Street, Commerce District, New York, NY 10001, USA",
    icon: (
      <MapPin className="h-6 w-6 transition-colors group-hover:text-primary" />
    ),
    href: "https://maps.google.com",
  },
  {
    title: "Call Us",
    subtitle: "+1 (555) 123-4567",
    icon: (
      <Phone className="h-6 w-6 transition-colors group-hover:text-primary" />
    ),
    href: "tel:+15551234567",
  },
  {
    title: "Working Hours",
    subtitle: "Monday - Friday: 9AM - 6PM",
    icon: (
      <Clock className="h-6 w-6 transition-colors group-hover:text-primary" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "support@techaudio.com",
    icon: (
      <Mail className="h-6 w-6 transition-colors group-hover:text-primary" />
    ),
    href: "mailto:support@techaudio.com",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        {/* footer top */}
        <FooterTop />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-5">
            <Logo footer />

            <SubText>
              Discover amazing products at Tech Audio, your trusted online shopping
              destination for quality items and exceptional customer service.
            </SubText>

            <SocialMedia
              className="text-dark-color/60"
              iconClassName="border-dark-color/60 hover:border-shop_dark_green hover:text-shop_dark_green"
              tooltipClassName="bg-dark-color text-white"
            />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinksData?.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-shop_dark_green"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              Categories
            </h3>

            <ul className="space-y-3">
                {/* db fetch later */}
              {categoriesData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={`/category/${item.href}`}
                    className="capitalize text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-shop_dark_green"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              Newsletter
            </h3>

            <p className="mb-4 text-sm leading-6 text-gray-600">
              Subscribe to our newsletter to receive updates, special offers,
              and exclusive discounts.
            </p>

            <NewsletterForm />
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()}{" "} Tech Audio. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer;


// footer top
const FooterTop = () => {
  return (
    <div className="grid grid-cols-1 gap-4 border-b py-6 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((item) => (
        <ContactItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          content={item.subtitle}
          href={item.href}
        />
      ))}
    </div>
  )
}



// newsletterform
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage({
        type: "error",
        text: "Email is required.",
      });
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({
        type: "info",
        text: "Subscribing to newsletter...",
      });

      // Fake API delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      setMessage({
        type: "success",
        text: "Successfully subscribed!",
      });

      setEmail("");
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          disabled={isLoading}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-shop_dark_green disabled:cursor-not-allowed disabled:bg-gray-100"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

      {/* Message */}
      {message && (
        <div
          className={`flex items-start gap-2 rounded-lg border p-3 text-sm animate-in fade-in slide-in-from-top-2 duration-300 ${message.type === "success"
            ? "border-green-200 bg-green-50 text-green-800"
            : message.type === "info"
              ? "border-blue-200 bg-blue-50 text-blue-800"
              : "border-red-200 bg-red-50 text-red-800"
            }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}

          <span>{message.text}</span>
        </div>
      )}
    </div>
  )
}



// contact item
interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}

const ContactItem = ({
  icon,
  title,
  content,
  href,
}: ContactItemProps) => {
  const Component = href ? "a" : "div";

  const props = href
    ? {
        href,
        target: href.startsWith("http")
          ? "_blank"
          : undefined,
        rel: href.startsWith("http")
          ? "noopener noreferrer"
          : undefined,
      }
    : {};

  return (
    <Component
      {...props}
      className="group flex items-start  lg:justify-center gap-4 rounded-xl transition-all duration-300 hover:bg-gray-50"
    >
      <div className="mt-1 text-gray-600">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-primary">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-relaxed text-gray-600 transition-colors group-hover:text-gray-900">
          {content}
        </p>
      </div>
    </Component>
  );
};
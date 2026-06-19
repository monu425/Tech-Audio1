import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  footer?: boolean;
}

const Logo = ({ footer = false }: LogoProps) => {
  return (
    <Link href="/" className="flex items-center">
      {/* Footer Logo */}
      {footer ? (
        <Image
          src="/logo.png"
          alt="Logo"
          width={160}
          height={60}
          className="h-auto w-40"
        />
      ) : (
        <>
          {/* Desktop Logo */}
          <Image
            src="/logo.png"
            alt="Logo"
            width={160}
            height={60}
            className="hidden h-auto w-40 md:block"
          />

          {/* Mobile Icon */}
          <Image
            src="/icon.png"
            alt="Logo Icon"
            width={28}
            height={28}
            className="block h-auto w-7 md:hidden"
          />
        </>
      )}
    </Link>
  );
};

export default Logo;

import { cn } from "@/lib/utils";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faSquareLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const socialLink = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/",
    icon: <FontAwesomeIcon icon={faFacebookF} />,
  },
  {
    title: "Twitter",
    href: "https://twitter.com/",
    icon: <FontAwesomeIcon icon={faTwitter} />,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/",
    icon: <FontAwesomeIcon icon={faInstagram} />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: <FontAwesomeIcon icon={faSquareLinkedin} />,
  },
];

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      {socialLink?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-2 border rounded-xl hover:bg-shop_light_green hover:text-white hoverEffect",
            iconClassName,
          )}
        >
          {item?.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
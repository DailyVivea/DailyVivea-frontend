"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Bell, User } from "lucide-react";
import "@/style/header.css";

const navItems = [
  { name: "Home", path: "/dashboard" },
  { name: "Daily", path: "/record" },
  { name: "Report", path: "/report" },
  { name: "Todo", path: "/list" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <nav className="header-container">
      <div className="logo">
        <Image
          src="@/assets/images/logo-icon.png"
          alt="DailyVivea 로고"
          width={53}
          height={32}
        />
        <span className="logo-text">DailyVivea</span>
      </div>

      <ul className="nav-list">
        {navItems.map((item) => (
          <li
            key={item.path}
            className={pathname === item.path ? "nav-item.active" : "nav-item"}
          >
            <Link href={item.path}>{item.name}</Link> {}
          </li>
        ))}
      </ul>

      <div className="icon-container">
        <Bell size={24} className="Bell-Icon" />
        <User size={24} className="profile-Icon" />
      </div>
    </nav>
  );
};

export default Header;

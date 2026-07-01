"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const activeClass =
  "flex flex-1 items-center justify-center py-3 bg-theme-page text-foreground rounded-xs";
const baseClass =
  "flex flex-1 items-center justify-center py-3 bg-theme-muted text-theme-muted-foreground rounded-xs";

const tabs = [
  { href: "/", label: "首页" },
  { href: "/add", label: "新增" },
  { href: "/manage", label: "管理" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-around gap-0.25 bg-theme-page">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={pathname === tab.href ? activeClass : baseClass}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

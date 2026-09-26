"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import StatusIndicator from "./StatusIndicator";

const LINKS = [
  { href: "/", label: "Investigate" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="border-b hairline">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-display text-lg italic tracking-tight text-ivory"
        >
          EXCUSE<span className="align-super text-[0.55em] not-italic">™</span>
        </Link>

        <ul className="hidden items-center gap-7 font-mono text-[12px] tracking-[0.1em] text-ivory/70 sm:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-ivory ${
                    active ? "text-tangerine" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label.toUpperCase()}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden sm:block">
          <StatusIndicator />
        </div>

        {/* Mobile nav: compact link row, status hidden to save width */}
        <ul className="flex items-center gap-4 font-mono text-[11px] tracking-[0.08em] text-ivory/70 sm:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? "text-tangerine" : ""}
              >
                {link.label.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { navigation, siteConfig } from "@/data/site-config";
import { useCart } from "@/lib/cart";
import { getZaloUrl } from "@/lib/contact";
import { Logo } from "./Logo";
import { ZaloIcon } from "@/components/common/BrandIcons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const zaloUrl = getZaloUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Đóng menu/tìm kiếm khi đổi trang
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    const open = menuOpen || searchOpen;
    document.body.style.overflow = open ? "hidden" : "";
    if (searchOpen) searchRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, searchOpen]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setSearchOpen(false);
  }

  const iconBtn = "inline-flex size-11 items-center justify-center text-forest transition-colors hover:text-wood";

  return (
    <>
    <header
      className={`sticky top-0 z-40 border-b bg-ivory/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-line shadow-[0_6px_24px_-18px_rgba(38,61,37,0.45)]" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <div className="flex items-center gap-1 xl:hidden">
          <button type="button" className={`${iconBtn} -ml-3`} aria-label="Mở menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Menu className="size-6" strokeWidth={1.5} />
          </button>
        </div>

        <Logo className="xl:mr-6" />

        <nav aria-label="Điều hướng chính" className="hidden flex-1 justify-center xl:flex">
          <ul className="flex items-center gap-8 2xl:gap-10">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="relative py-2 whitespace-nowrap text-[0.92rem] text-text transition-colors hover:text-wood aria-[current=page]:text-forest aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-px aria-[current=page]:after:bg-wood"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-0.5">
          <button type="button" className={iconBtn} aria-label="Tìm kiếm sản phẩm" onClick={() => setSearchOpen(true)}>
            <Search className="size-5" strokeWidth={1.5} />
          </button>
          <Link href="/cart" className={`${iconBtn} relative`} aria-label={`Giỏ hàng (${count} sản phẩm)`}>
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute top-1.5 right-1 flex min-w-4.5 items-center justify-center rounded-full bg-wood px-1 text-[0.65rem] leading-4.5 font-semibold text-ivory">
                {count}
              </span>
            )}
          </Link>
          {zaloUrl ? (
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 hidden min-h-11 items-center gap-2 bg-forest px-4 text-sm text-ivory transition-colors hover:bg-grass md:inline-flex"
            >
              <ZaloIcon className="size-5" /> Đặt hàng
            </a>
          ) : (
            <Link
              href="/checkout"
              className="ml-2 hidden min-h-11 items-center gap-2 bg-forest px-4 text-sm text-ivory transition-colors hover:bg-grass md:inline-flex"
            >
              Đặt hàng
            </Link>
          )}
        </div>
      </div>

    </header>

      {/* Mobile drawer — đặt ngoài <header> vì backdrop-blur tạo containing block cho phần tử fixed */}
      <div
        className={`fixed inset-0 z-50 xl:hidden ${menuOpen ? "visible" : "invisible"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-text/40 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-ivory transition-transform duration-400 ease-soft ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <Logo />
            <button type="button" className={`${iconBtn} -mr-3`} aria-label="Đóng menu" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>
          <nav aria-label="Menu di động" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-line/70">
                  <Link
                    href={item.href}
                    tabIndex={menuOpen ? 0 : -1}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex min-h-14 items-center font-serif text-2xl text-forest aria-[current=page]:text-wood"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-line px-5 py-5 text-sm text-muted">
            <p className="font-script text-xl text-wood">{siteConfig.tagline}</p>
            <p className="mt-1">{siteConfig.origin}</p>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <div
        className={`fixed inset-0 z-50 ${searchOpen ? "visible" : "invisible"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Tìm kiếm"
        aria-hidden={!searchOpen}
      >
        <div
          className={`absolute inset-0 bg-text/40 transition-opacity duration-300 ${searchOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setSearchOpen(false)}
        />
        <div className={`absolute inset-x-0 top-0 bg-ivory py-6 transition-transform duration-300 ${searchOpen ? "translate-y-0" : "-translate-y-full"}`}>
          <form onSubmit={submitSearch} className="container-page flex items-center gap-3" role="search">
            <Search className="size-5 shrink-0 text-muted" strokeWidth={1.5} aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Tìm sản phẩm
            </label>
            <input
              ref={searchRef}
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm nón lá, quà tặng…"
              tabIndex={searchOpen ? 0 : -1}
              className="min-h-12 flex-1 border-b border-line bg-transparent font-serif text-2xl text-forest placeholder:text-muted/70 focus:border-forest focus:outline-none"
            />
            <button type="button" className={iconBtn} aria-label="Đóng tìm kiếm" onClick={() => setSearchOpen(false)} tabIndex={searchOpen ? 0 : -1}>
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state for backdrop
      setScrolled(window.scrollY > 20);

      // Scroll progress bar
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Simple active section detection
      const sections = ["rooms", "facilities", "location", "faq", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
      else if (window.scrollY < 100) setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "Rooms", href: "/#rooms", id: "rooms" },
    { name: "Facilities", href: "/#facilities", id: "facilities" },
    { name: "Reviews", href: "/reviews", id: "reviews" },
    { name: "Location", href: "/#location", id: "location" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50 py-2"
          : "bg-transparent py-4"
      }`}
    >
      {/* Scroll Progress Bar */}
      {/* <div className="absolute bottom-0 left-0 h-[2px] bg-primary/30 w-full overflow-hidden"> */}
      {/* <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        /> */}
      {/* </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="SHAURYA SSB STAY"
                  width={150}
                  height={50}
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative group overflow-hidden ${
                  activeSection === link.id
                    ? "text-primary dark:text-secondary"
                    : "text-foreground/80 hover:text-primary dark:hover:text-secondary"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ${
                    activeSection === link.id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border/50">
              {mounted && (
                <button
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  className="p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground/80 transition-all duration-300 active:scale-90"
                  aria-label="Toggle Theme"
                >
                  {resolvedTheme === "dark" ? (
                    <Sun size={18} className="text-secondary" />
                  ) : (
                    <Moon size={18} className="text-primary" />
                  )}
                </button>
              )}

              <Link
                href="/#booking-form"
                className="relative group px-6 py-2.5 bg-primary text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] active:scale-95"
              >
                <span className="relative z-10">Book Now</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-3">
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-xl bg-foreground/5 text-foreground/80 transition-active active:scale-90"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={18} className="text-secondary" />
                ) : (
                  <Moon size={18} className="text-primary" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-primary/10 text-primary dark:text-secondary transition-all active:scale-90"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) overflow-hidden border-b border-border/50 ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-2xl px-4 pt-4 pb-8 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-lg font-semibold transition-all ${
                activeSection === link.id
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-foreground/70 hover:bg-foreground/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#booking-form"
            onClick={() => setIsOpen(false)}
            className="block w-full py-4 bg-primary text-white text-center rounded-xl font-semibold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all mt-4"
          >
            Book Your Stay
          </Link>
        </div>
      </div>

      {/* Backdrop for Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;

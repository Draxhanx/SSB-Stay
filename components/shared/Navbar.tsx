"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SHAURYA SSB STAY"
                width={150}
                height={50}
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary font-bold transition"
            >
              Home
            </Link>
            <Link
              href="/#rooms"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary font-bold transition"
            >
              Rooms
            </Link>
            <Link
              href="/#facilities"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary font-bold transition"
            >
              Facilities
            </Link>
            <Link
              href="/#location"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary font-bold transition"
            >
              Location
            </Link>

            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle Theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>
            )}

            <Link
              href="/#contact"
              className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-primary-dark transition shadow-md shadow-teal-900/10"
            >
              Book Now
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary dark:text-secondary"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border absolute w-full shadow-lg transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-foreground/80 hover:bg-secondary-light dark:hover:bg-gray-900 hover:text-primary rounded-lg font-medium transition"
            >
              Home
            </Link>
            <Link
              href="/#rooms"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-secondary-light dark:hover:bg-gray-900 hover:text-primary rounded-lg font-medium transition"
            >
              Rooms
            </Link>
            <Link
              href="/#facilities"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-secondary-light dark:hover:bg-gray-900 hover:text-primary rounded-lg font-medium transition"
            >
              Facilities
            </Link>
            <Link
              href="/#location"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-secondary-light dark:hover:bg-gray-900 hover:text-primary rounded-lg font-medium transition"
            >
              Location
            </Link>
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 bg-primary text-white text-center rounded-lg font-bold mt-4 shadow-lg shadow-teal-900/10"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

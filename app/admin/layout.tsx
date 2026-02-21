"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LogOut,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ExternalLink,
  Star,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Close sidebar on path change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Bookings",
      href: "/admin/bookings",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "Reviews",
      href: "/admin/reviews",
      icon: <Star size={20} />,
    },
    {
      name: "QR Codes",
      href: "/admin/qrcode",
      icon: <ExternalLink size={20} />,
    },
    { name: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
  ];

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-secondary/10 dark:border-white/5 z-50 flex items-center gap-4 px-6 py-4 shadow-sm transition-colors duration-300">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-primary dark:text-secondary bg-primary/5 dark:bg-white/5 rounded-xl transition-all active:scale-95"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <h2 className="text-lg font-heading font-bold text-primary dark:text-white whitespace-nowrap">
            SHAURYA SSB STAY
          </h2>
        </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white dark:bg-gray-900 border-r border-secondary/10 dark:border-white/5 fixed inset-y-0 z-50 transition-all duration-300 shadow-xl shadow-teal-900/5 flex flex-col ${
          isSidebarOpen ? "left-0" : "-left-64"
        } lg:left-0 transition-colors duration-300`}
      >
        <div className="p-6 border-b border-light-orange/10 dark:border-white/5 hidden lg:block">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/logo.png"
              alt="SHAURYA SSB STAY"
              width={60}
              height={60}
              className="w-15 h-15 object-contain"
            />
            <h2 className="text-xl font-heading font-bold text-primary dark:text-white text-center">
              SHAURYA SSB STAY
            </h2>
          </div>
        </div>

        <nav className="flex-1 mt-20 lg:mt-8 px-4 space-y-3 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                pathname === item.href
                  ? "bg-primary text-white shadow-lg shadow-teal-900/20 scale-[1.02]"
                  : "text-gray-500 dark:text-gray-400 hover:bg-secondary-light dark:hover:bg-white/5 hover:text-primary dark:hover:text-secondary"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-secondary/10 dark:border-white/5 space-y-2">
          {mounted && (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all w-full"
            >
              {resolvedTheme === "dark" ? (
                <>
                  <Sun size={20} className="text-secondary" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={20} className="text-primary" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 pt-20 lg:pt-0 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

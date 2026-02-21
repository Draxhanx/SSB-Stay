"use client";

import Link from "next/link";
import {
  LogOut,
  LayoutDashboard,
  Bed,
  MessageSquare,
  Settings,
  ExternalLink,
  Star,
} from "lucide-react";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Rooms", href: "/admin/rooms", icon: <Bed size={20} /> },
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-secondary/10 fixed inset-y-0 hidden lg:block shadow-xl shadow-teal-900/5">
        <div className="p-6 border-b border-light-orange/10">
          <h2 className="text-2xl font-heading font-bold text-primary">
            Admin Panel
          </h2>
        </div>
        <nav className="mt-8 px-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                pathname === item.href
                  ? "bg-primary text-white shadow-lg shadow-teal-900/20 scale-[1.02]"
                  : "text-gray-500 hover:bg-secondary-light hover:text-primary"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all w-full mt-10"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;

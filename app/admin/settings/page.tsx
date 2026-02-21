"use client";

import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AdminSettings() {
  const sections = [
    {
      title: "Account Settings",
      description: "Manage your admin profile and login credentials.",
      icon: <User className="text-primary" />,
      items: ["Update Username", "Change Password", "Profile Settings"],
    },
    {
      title: "Notifications",
      description: "Configure how you receive booking and review alerts.",
      icon: <Bell className="text-secondary" />,
      items: ["Email Notifications", "Browser Alerts", "Weekly Reports"],
    },
    {
      title: "Security",
      description: "Control your account's privacy and access levels.",
      icon: <Shield className="text-primary-dark" />,
      items: ["Two-Factor Auth", "Session Management", "Login Audit"],
    },
    {
      title: "Appearance",
      description: "Customize the admin panel look and dashboard layout.",
      icon: <Palette className="text-teal-600" />,
      items: ["Theme Settings", "Compact View", "Widget Preferences"],
    },
  ];

  return (
    <div className="p-8 bg-gray-50/50 dark:bg-background/50 min-h-screen transition-colors duration-300">
      <div className="mb-12">
        <h1 className="text-3xl font-heading font-semibold text-primary-dark dark:text-white mb-2">
          Admin Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium italic">
          Manage your preferences and system configuration.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl shadow-teal-900/5 border border-secondary/10 dark:border-white/5 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                {section.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-primary-dark dark:text-white uppercase tracking-tight">
                  {section.title}
                </h2>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-medium italic">
                  {section.description}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-50 dark:border-white/5">
              {section.items.map((item, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between p-4 bg-gray-50/50 dark:bg-background/50 hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl transition-all border border-transparent hover:border-primary/10 group/item"
                >
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest group-hover/item:text-primary transition-colors">
                    {item}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-gray-300 group-hover/item:text-primary group-hover/item:translate-x-1 transition-all"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl shadow-teal-900/5 border border-secondary/10 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-6xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <LayoutDashboard size={20} className="text-primary" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium italic">
            Need to return to your workspace?
          </p>
        </div>
        <Link
          href="/admin/dashboard"
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary-dark transition-all shadow-lg shadow-teal-900/10 active:scale-95"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

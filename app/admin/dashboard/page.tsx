"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  IndianRupee,
  TrendingUp,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

interface Stat {
  name: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface Enquiry {
  _id: string;
  name: string;
  roomType: string;
  phone: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      } else {
        toast.error("Failed to load dashboard statistics");
      }
    } catch (error) {
      toast.error("An error occurred while fetching stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-gray-500 font-semibold animate-pulse">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const statCards: Stat[] = [
    {
      name: "Total Enquiries",
      value: stats?.totalEnquiries || 0,
      icon: <MessageSquare className="h-6 w-6" />,
      color: "bg-primary shadow-primary/20",
      description: "Lifetime enquiries received",
    },
    {
      name: "Enquiries Today",
      value: stats?.todayEnquiries || 0,
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-secondary shadow-secondary/20",
      description: "New enquiries in last 24h",
    },
    {
      name: "Estimated Revenue",
      value: `₹${stats?.totalRevenue || 0}`,
      icon: <IndianRupee className="h-6 w-6" />,
      color: "bg-primary-dark shadow-primary-dark/20",
      description: "Based on confirmed bookings",
    },
    {
      name: "Conversion Rate",
      value:
        stats?.totalEnquiries > 0
          ? `${((stats?.totalRevenue / 349 / stats?.totalEnquiries) * 100).toFixed(1)}%`
          : "0%",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-teal-600 shadow-teal-600/20",
      description: "Enquiries to confirmed",
    },
  ];

  return (
    <div className="p-3 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-background/50 min-h-screen transition-colors duration-300">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-8 lg:mb-12 mt-16 lg:mt-0">
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-primary dark:text-white mb-1 uppercase tracking-tight">
            SHAURYA SSB STAY
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium italic text-xs sm:text-sm lg:text-base">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <Link
          href="/admin/bookings"
          className="group w-full sm:w-fit lg:w-auto flex items-center justify-center gap-3 bg-primary text-white px-5 sm:px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-teal-900/10 active:scale-95 text-sm sm:text-base"
        >
          <span className="whitespace-nowrap">View All Bookings</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-12">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900/50 p-5 sm:p-6 lg:p-7 rounded-2xl shadow-xl shadow-teal-900/5 border border-secondary/10 dark:border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center lg:block gap-4">
              <div
                className={`w-12 h-12 lg:w-14 lg:h-14 ${stat.color} text-white rounded-xl flex items-center justify-center mb-0 lg:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-[10px] lg:text-xs font-bold uppercase tracking-[0.15em] mb-1">
                  {stat.name}
                </p>
                <p className="text-xl lg:text-3xl font-semibold text-primary-dark dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
            <p className="hidden lg:block text-gray-400 dark:text-gray-500 text-[10px] lg:text-xs mt-3 font-medium italic">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900/50 rounded-2xl shadow-xl shadow-teal-900/5 border border-secondary/10 dark:border-white/5 p-4 sm:p-6 lg:p-8 overflow-hidden">
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-primary-dark dark:text-white flex items-center gap-2">
            <TrendingUp className="text-primary w-4 h-4 sm:w-5 sm:h-5" /> Recent
            Enquiries
          </h2>
          <Link
            href="/admin/bookings"
            className="text-primary hover:text-primary-dark text-xs sm:text-sm font-semibold border-b-2 border-primary/20 hover:border-primary transition-all pb-0.5"
          >
            View All
          </Link>
        </div>

        {/* Desktop/Tablet Table View */}
        <div className="hidden sm:block overflow-x-auto pb-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-white/5 text-gray-400 dark:text-gray-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                <th className="pb-4 sm:pb-5 pl-2 font-bold">Guest</th>
                <th className="pb-4 sm:pb-5 font-bold">Room Preferred</th>
                <th className="pb-4 sm:pb-5 font-bold">Contact</th>
                <th className="pb-4 sm:pb-5 font-bold">Status</th>
                <th className="pb-4 sm:pb-5 font-bold text-right pr-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/5">
              {stats?.recentEnquiries?.map((enquiry: Enquiry) => (
                <tr
                  key={enquiry._id}
                  className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group"
                >
                  <td className="py-4 sm:py-5 pl-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs sm:text-sm lg:text-base text-primary-dark dark:text-gray-200">
                        {enquiry.name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 sm:py-5">
                    <span className="px-2.5 py-1 bg-secondary-light/30 dark:bg-white/5 text-primary text-[10px] sm:text-xs font-semibold rounded-lg whitespace-nowrap">
                      {enquiry.roomType || "Unspecified"}
                    </span>
                  </td>
                  <td className="py-4 sm:py-5 text-gray-600 dark:text-gray-400 font-medium text-[11px] sm:text-sm whitespace-nowrap">
                    {enquiry.phone}
                  </td>
                  <td className="py-4 sm:py-5">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${
                        enquiry.status === "Confirmed"
                          ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400"
                          : enquiry.status === "Cancelled"
                            ? "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                            : "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                      }`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="py-4 sm:py-5 text-right pr-2">
                    <Link
                      href="/admin/bookings"
                      className="text-primary hover:text-white hover:bg-primary px-3 py-1.5 rounded-lg transition-all text-[10px] font-bold whitespace-nowrap border border-primary/20"
                    >
                      DETAILS
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-Friendly Card View */}
        <div className="sm:hidden space-y-4">
          {stats?.recentEnquiries?.map((enquiry: Enquiry) => (
            <div
              key={enquiry._id}
              className="bg-gray-50/50 dark:bg-white/5 p-4 rounded-xl border border-secondary/10 dark:border-white/5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-primary-dark dark:text-white uppercase truncate max-w-[150px]">
                    {enquiry.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                    enquiry.status === "Confirmed"
                      ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400"
                      : enquiry.status === "Cancelled"
                        ? "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                        : "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                  }`}
                >
                  {enquiry.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-secondary/5 dark:border-white/5">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Room Type
                  </p>
                  <span className="text-xs font-semibold text-primary dark:text-secondary">
                    {enquiry.roomType || "Unspecified"}
                  </span>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Contact
                  </p>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {enquiry.phone}
                  </span>
                </div>
              </div>

              <Link
                href="/admin/bookings"
                className="block w-full text-center bg-primary/10 dark:bg-primary/20 text-primary py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest active:scale-[0.98] transition-all"
              >
                VIEW DETAILS
              </Link>
            </div>
          ))}
        </div>

        {(!stats?.recentEnquiries || stats.recentEnquiries.length === 0) && (
          <div className="py-12 text-center text-gray-400 font-medium italic text-sm">
            No recent enquiries found.
          </div>
        )}
      </div>
    </div>
  );
}

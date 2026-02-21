"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Phone,
  User,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  Bed,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

import toast from "react-hot-toast";

interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  roomType: string;
  message: string;
  status: string;
  createdAt: string;
}

interface ApiResponse {
  data: Enquiry[];
  total: number;
  pages: number;
  currentPage: number;
}

const BookingsPage = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/enquiries?q=${search}&status=${filter}&page=${page}&limit=10`,
      );
      const result = await res.json();
      if (res.ok) {
        setData(result);
      } else {
        toast.error("Failed to fetch enquiries");
      }
    } catch (error) {
      toast.error("An error occurred while fetching enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEnquiries();
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [search, filter, page]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setData((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            data: prev.data.map((e) => (e._id === id ? { ...e, status } : e)),
          };
        });
        toast.success(`Booking status updated to ${status}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50/50 dark:bg-background/50 min-h-screen transition-colors duration-300">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-dark dark:text-white">
            Bookings & Enquiries
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-[0.2em] text-[10px] mt-1 italic">
            Manage your one-night stay requests
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or number..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-secondary/10 dark:border-white/5 outline-none focus:ring-2 focus:ring-primary shadow-sm text-sm font-medium dark:text-white"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-1.5 rounded-xl border border-secondary/10 dark:border-white/5 shadow-sm">
            <Filter size={16} className="text-gray-400 ml-2" />
            <select
              className="bg-transparent border-none outline-none font-bold text-xs text-gray-700 dark:text-gray-300 pr-4 py-1.5 uppercase tracking-widest cursor-pointer"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="bg-white dark:bg-gray-900/50 p-20 rounded-xl text-center border border-secondary/10 dark:border-white/5 shadow-sm backdrop-blur-sm">
            <Loader2
              className="mx-auto text-primary animate-spin mb-4"
              size={40}
            />
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
              Filtering Records...
            </p>
          </div>
        ) : !data || data.data.length === 0 ? (
          <div className="bg-white dark:bg-gray-900/50 p-16 rounded-xl text-center border border-secondary/10 dark:border-white/5 shadow-sm">
            <AlertCircle
              className="mx-auto text-gray-300 dark:text-gray-700 mb-4"
              size={48}
            />
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">
              No results found
            </p>
            <button
              onClick={() => {
                setSearch("");
                setFilter("all");
                setPage(1);
              }}
              className="mt-4 text-primary font-bold text-xs hover:underline uppercase tracking-widest"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {data.data.map((enquiry) => (
                <div
                  key={enquiry._id}
                  className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl border border-secondary/10 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 w-2 h-full transition-transform group-hover:scale-y-110 ${
                      enquiry.status === "Confirmed"
                        ? "bg-green-500"
                        : enquiry.status === "Cancelled"
                          ? "bg-red-500"
                          : "bg-secondary"
                    }`}
                  />

                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/5 dark:bg-white/5 rounded-xl flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                          <User size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-primary-dark dark:text-white uppercase tracking-tight">
                            {enquiry.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 mt-1">
                            <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                              <Phone size={14} className="text-secondary" />{" "}
                              {enquiry.phone}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                              <Calendar size={14} className="text-secondary" />{" "}
                              {new Date(enquiry.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50/50 dark:bg-background/50 p-5 rounded-xl border border-secondary/5 dark:border-white/5 group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <Bed size={16} className="text-primary" />
                          <span className="text-[10px] font-bold uppercase text-primary tracking-[0.2em]">
                            Preference: {enquiry.roomType || "Common Hall"}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic text-sm">
                          "{enquiry.message || "No special requests mentioned."}
                          "
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-end gap-6 min-w-[200px]">
                      <div
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm ${
                          enquiry.status === "Confirmed"
                            ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20"
                            : enquiry.status === "Cancelled"
                              ? "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                              : "bg-secondary-light dark:bg-white/5 text-primary-dark dark:text-secondary border border-secondary/20 dark:border-white/5"
                        }`}
                      >
                        {enquiry.status}
                      </div>

                      <div className="flex gap-2">
                        {enquiry.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(enquiry._id, "Confirmed")
                              }
                              className="flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                            >
                              <CheckCircle2 size={16} /> Confirm
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(enquiry._id, "Cancelled")
                              }
                              className="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                            >
                              <XCircle size={16} /> Cancel
                            </button>
                          </>
                        )}
                        {enquiry.status !== "Pending" && (
                          <button
                            onClick={() => updateStatus(enquiry._id, "Pending")}
                            className="text-gray-400 hover:text-primary p-3 hover:bg-primary/5 rounded-xl transition-all"
                            title="Move to Pending"
                          >
                            <Clock size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data.pages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12 mb-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-3 rounded-xl border border-secondary/10 dark:border-white/5 bg-white dark:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm text-primary"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="bg-white dark:bg-gray-900 px-6 py-2.5 rounded-xl border border-secondary/10 dark:border-white/5 shadow-sm">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Page <span className="text-primary">{page}</span> of{" "}
                    {data.pages}
                  </span>
                </div>
                <button
                  disabled={page === data.pages}
                  onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
                  className="p-3 rounded-xl border border-secondary/10 dark:border-white/5 bg-white dark:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm text-primary"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;

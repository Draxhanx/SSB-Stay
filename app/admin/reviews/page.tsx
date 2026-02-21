"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  isApproved: boolean;
}

interface ApiResponse {
  data: Review[];
  total: number;
  pages: number;
  currentPage: number;
}

export default function AdminReviews() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reviews?q=${search}&page=${page}&limit=10`);
      const result = await res.json();
      if (res.ok) {
        setData(result);
      } else {
        toast.error("Failed to load reviews");
      }
    } catch (error) {
      toast.error("An error occurred while fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReviews();
    }, 500);
    return () => clearTimeout(timer);
  }, [search, page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      // Assuming a DELETE endpoint exists or will be added.
      // For now, let's just update the local state to give immediate feedback.
      setData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          data: prev.data.filter((r) => r._id !== id),
          total: prev.total - 1,
        };
      });
      toast.success("Review removed from list");
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="p-8 bg-gray-50/50 dark:bg-background/50 min-h-screen transition-colors duration-300">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-dark dark:text-white">
            Manage Reviews
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-[0.2em] text-[10px] mt-1 italic">
            Moderate and view visitor feedback
          </p>
        </div>

        <div className="relative w-full sm:w-80 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search reviews or names..."
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900 rounded-xl border border-secondary/10 dark:border-white/5 outline-none focus:ring-2 focus:ring-primary shadow-sm text-sm font-medium dark:text-white"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
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
              Filtering feedback...
            </p>
          </div>
        ) : !data || data.data.length === 0 ? (
          <div className="bg-white dark:bg-gray-900/50 p-16 rounded-xl text-center border border-secondary/10 dark:border-white/5 shadow-sm">
            <AlertCircle
              className="mx-auto text-gray-300 dark:text-gray-700 mb-4"
              size={48}
            />
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">
              No reviews found
            </p>
            <button
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
              className="mt-4 text-primary font-bold text-xs hover:underline uppercase tracking-widest"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {data.data.map((review) => (
                <div
                  key={review._id}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-secondary/10 dark:border-white/5 flex flex-col md:flex-row items-start justify-between group gap-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < review.rating
                                ? "fill-secondary text-secondary"
                                : "text-gray-200 dark:text-gray-800"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5 uppercase tracking-widest">
                        <Clock size={12} />{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-primary-dark dark:text-white mb-3 uppercase tracking-tight">
                      {review.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium italic border-l-4 border-secondary/20 dark:border-white/10 pl-5 py-2 text-base leading-relaxed">
                      "{review.comment}"
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-green-100 dark:border-green-500/10">
                        <CheckCircle size={14} /> Approved
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="self-end md:self-start p-4 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-100 dark:hover:border-red-500/20 bg-gray-50 dark:bg-white/5 md:bg-transparent"
                  >
                    <Trash2 size={24} />
                  </button>
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
}

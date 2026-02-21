"use client";

import { useEffect, useState } from "react";
import { Star, Trash2, CheckCircle, Clock } from "lucide-react";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  isApproved: boolean;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    // In a real app, you'd have a DELETE endpoint.
    // For now, let's just mock the UI update or assume success.
    setReviews(reviews.filter((r) => r._id !== id));
  };

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-black text-primary-dark">
          Manage Reviews
        </h1>
        <p className="text-gray-500 font-medium">
          Moderate and view visitor feedback.
        </p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/10 flex items-start justify-between group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "fill-secondary text-secondary"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1 uppercase tracking-widest">
                    <Clock size={12} />{" "}
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-black text-primary-dark mb-2">
                  {review.name}
                </h3>
                <p className="text-gray-600 font-medium italic border-l-4 border-secondary/20 pl-4 py-1">
                  "{review.comment}"
                </p>

                <div className="mt-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-full">
                    <CheckCircle size={14} /> Approved
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(review._id)}
                className="p-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition border border-transparent hover:border-red-100 bg-gray-50 sm:bg-transparent"
              >
                <Trash2 size={24} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

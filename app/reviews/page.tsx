"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare, Quote, Calendar } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          setReviews(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary dark:bg-background relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl font-heading font-semibold text-white dark:text-secondary mb-6 tracking-tight">
            Guest Testimonials
          </h1>
          <p className="text-xl text-teal-50 dark:text-gray-400 max-w-2xl mx-auto font-medium transition-colors duration-300">
            Discover why students and candidates choose Shaurya SSB Stay for
            their exam journeys. Real stories from real guests.
          </p>

          <div className="mt-10">
            <Link
              href="/reviews/new"
              className="inline-flex items-center gap-2 bg-secondary text-primary-dark px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary transition shadow-2xl shadow-black/20 active:scale-95 transform hover:-translate-y-1"
            >
              <MessageSquare size={24} /> Share Your Experience
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary mb-4"></div>
              <p className="text-gray-500 font-semibold uppercase tracking-widest animate-pulse">
                Loading experience...
              </p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-xl border-2 border-dashed border-border transition-colors duration-300">
              <Quote className="mx-auto text-secondary/20 mb-6" size={64} />
              <p className="text-2xl font-semibold text-gray-500 italic mb-8">
                No reviews yet. Be the first to share your journey!
              </p>
              <Link
                href="/reviews/new"
                className="text-primary font-semibold uppercase tracking-widest hover:underline"
              >
                Write a Review
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-card p-10 rounded-xl shadow-xl shadow-black/5 border border-border relative transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < review.rating
                              ? "fill-secondary text-secondary"
                              : "text-gray-200 dark:text-gray-800"
                          }
                        />
                      ))}
                    </div>
                    <div className="text-xs font-semibold text-gray-400 flex items-center gap-1 uppercase tracking-widest">
                      <Calendar size={12} className="text-secondary" />
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-8 italic text-lg leading-relaxed font-medium transition-colors duration-300">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-semibold text-xl">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-primary-dark dark:text-white text-lg">
                        {review.name}
                      </p>
                      <p className="text-xs text-secondary font-semibold uppercase tracking-widest">
                        Verified Guest
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

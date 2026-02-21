"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function NewReviewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating }),
      });

      if (res.ok) {
        alert("Thank you for your review!");
        router.push("/");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-secondary/10">
          <h1 className="text-3xl font-heading font-black text-primary mb-2">
            Share Your Experience
          </h1>
          <p className="text-gray-500 mb-8 font-medium">
            Your feedback helps fellow students!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition transform hover:scale-110"
                >
                  <Star
                    size={36}
                    className={
                      star <= rating
                        ? "fill-secondary text-secondary"
                        : "text-gray-200"
                    }
                  />
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition"
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">
                Your Review
              </label>
              <textarea
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none h-32 resize-none transition"
                placeholder="How was your stay?"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-6 rounded-2xl shadow-xl text-white bg-primary hover:bg-primary-dark font-black text-lg transition flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send size={20} /> Submit Review
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}

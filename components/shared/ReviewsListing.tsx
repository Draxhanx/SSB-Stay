"use client";

import { Star } from "lucide-react";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ReviewsListing = ({ reviews }: { reviews: Review[] }) => {
  return (
    <section className="py-10 bg-secondary-light/20 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-black dark:text-white mb-4">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
            Real experiences from students and candidates.
          </p>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 text-center sm:text-left">
            {reviews.slice(0, 6).map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-secondary/10 dark:border-gray-800 relative transition-all duration-300 hover:shadow-md"
              >
                <div className="flex mb-4 justify-center sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < review.rating
                          ? "fill-secondary text-secondary"
                          : "text-gray-200 dark:text-gray-700"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed transition-colors duration-300">
                  "{review.comment}"
                </p>
                <div>
                  <p className="font-black text-primary-dark dark:text-secondary">
                    {review.name}
                  </p>
                  <p className="text-xs text-secondary dark:text-gray-500 font-bold uppercase tracking-widest mt-1 transition-colors duration-300">
                    Verified Guest
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsListing;

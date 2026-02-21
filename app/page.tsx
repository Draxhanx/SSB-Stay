import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import Facilities from "@/components/shared/Facilities";
import Rooms from "@/components/shared/Rooms";
import FAQ from "@/components/shared/FAQ";
import Contact from "@/components/shared/Contact";
import Footer from "@/components/shared/Footer";
import ReviewsListing from "@/components/shared/ReviewsListing";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";

async function getReviews() {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI missing, skipping review fetch during build");
      return [];
    }

    await connectDB();
    const reviews = await Review.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Convert Mongo _id to string for serialization
    return JSON.parse(JSON.stringify(reviews)) || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export default async function Home() {
  const reviews = await getReviews();

  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <Hero />
      <Facilities />
      <Rooms />

      <ReviewsListing reviews={reviews} />

      {/* Location Section */}
      <section
        id="location"
        className="py-20 bg-background transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-black dark:text-white mb-4">
              Our Location
            </h2>

            <p className="text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
              Conveniently located near major exam centers and interview
              locations.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 bg-secondary-light/30 dark:bg-gray-900 rounded-xl overflow-hidden h-[400px] border border-secondary/20 dark:border-gray-800 shadow-inner relative transition-colors duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11568.1102268481!2d-79.4002697!3d43.6628917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34927b2e353b%3A0xc3c94592da156bf9!2sUniversity%20of%20Toronto!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="space-y-6">
              <div className="bg-secondary-light/50 dark:bg-gray-900 p-6 rounded-xl border-l-4 border-primary transition-colors duration-300">
                <h3 className="font-semibold text-lg mb-2 text-primary-dark dark:text-secondary">
                  Nearby Landmarks
                </h3>
                <ul className="space-y-3 text-primary/80 font-medium">
                  <li>• SSB Station (200 m away)</li>
                  <li>• Gufa Mandir (3 mins away)</li>
                  <li>• Kidzee Pre School (2 mins walk)</li>
                </ul>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic font-medium transition-colors duration-300">
                11, Geeta Bhawan, Ramanand Nagar, Lalghati, Bhopal 462030
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <Contact />
      <Footer />
    </main>
  );
}

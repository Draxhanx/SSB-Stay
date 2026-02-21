import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-semibold text-black dark:text-white mb-10 text-center transition-colors duration-300">
            Privacy Policy
          </h1>

          <div className="prose prose-lg text-gray-600 dark:text-gray-400 max-w-none font-medium space-y-8 transition-colors duration-300">
            <p>
              At Shaurya SSB Stay, we value the privacy of our students and
              candidates. This policy outlines how we handle your personal
              information.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-secondary mb-4 transition-colors duration-300">
                1. Information Collection
              </h2>
              <p>
                We collect information when you fill out our enquiry form or
                contact us via WhatsApp/Phone. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Full Name</li>
                <li>Phone Number</li>
                <li>Visit Details or Special Requirements (via message)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-secondary mb-4 transition-colors duration-300">
                2. Use of Information
              </h2>
              <p>The information collected is used solely to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Process and confirm your stay booking.</li>
                <li>Contact you regarding your enquiry.</li>
                <li>
                  Provide you with location details and check-in instructions.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-secondary mb-4 transition-colors duration-300">
                3. Data Security
              </h2>
              <p>
                We take appropriate measures to ensure your contact details are
                kept secure. We do not sell, trade, or share your personal
                information with third-party marketing agencies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-secondary mb-4 transition-colors duration-300">
                4. Third-Party Links
              </h2>
              <p>
                Our website may include links to Google Maps or WhatsApp. These
                third-party sites have their own privacy policies, and we are
                not responsible for their content or activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-secondary mb-4 transition-colors duration-300">
                5. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us through our official phone number or WhatsApp
                provided on this website.
              </p>
            </section>

            <p className="text-sm italic pt-10 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

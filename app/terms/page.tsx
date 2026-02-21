import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-semibold text-black dark:text-white mb-10 text-center transition-colors duration-300">
            Terms of Service
          </h1>

          <div className="prose prose-lg text-gray-600 dark:text-gray-400 max-w-none font-medium space-y-8 transition-colors duration-300">
            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-secondary mb-4 transition-colors duration-300">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the services of Shaurya SSB Stay, you
                agree to comply with and be bound by these Terms of Service. If
                you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-secondary mb-4 transition-colors duration-300">
                2. Booking and Payments
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Bookings are confirmed only upon receipt of the required
                  information and confirmation message.
                </li>
                <li>
                  Exact address and check-in details are shared only after
                  booking confirmation for security reasons.
                </li>
                <li>
                  Rates are subject to change, but confirmed bookings will
                  always be honored at the booked price.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-secondary mb-4 transition-colors duration-300">
                3. House Rules & Discipline
              </h2>
              <p>
                As we cater to students and SSB candidates, we maintain a
                disciplined environment:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Strict quiet hours must be observed during nighttime.</li>
                <li>
                  Hygiene and cleanliness must be maintained in shared areas and
                  dormitories.
                </li>
                <li>
                  Any form of tobacco, alcohol, or illegal substances is
                  strictly prohibited.
                </li>
                <li>
                  Management reserves the right to ask anyone violating these
                  rules to leave immediately without a refund.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-secondary mb-4 transition-colors duration-300">
                4. Cancellation Policy
              </h2>
              <p>
                We understand plans can change due to exam schedule shifts.
                Please notify us at least 24 hours in advance for cancellations
                or rescheduling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary dark:text-secondary mb-4 transition-colors duration-300">
                5. Liability
              </h2>
              <p>
                Shaurya SSB Stay is not responsible for the loss of personal
                belongings. Guests are advised to keep their valuables secure in
                provided lockers (if available) or with them at all times.
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

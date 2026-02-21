import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Users, Target, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-heading font-semibold text-black dark:text-white mb-6">
              About Shaurya{" "}
              <span className="text-primary dark:text-secondary">SSB Stay</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed transition-colors duration-300">
              Serving the heroes of tomorrow by providing affordable, safe, and
              clean accommodation for SSB interview candidates and student exam
              travelers.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-secondary-light/20 dark:bg-gray-900 p-8 rounded-xl border border-secondary/10 dark:border-gray-800 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/10 dark:bg-secondary/10 rounded-xl flex items-center justify-center text-primary dark:text-secondary mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
                To eliminate the stress of finding quality and affordable
                accommodation for students traveling far from home for their
                life-changing exams and interviews.
              </p>
            </div>
            <div className="bg-secondary-light/20 dark:bg-gray-900 p-8 rounded-xl border border-secondary/10 dark:border-gray-800 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/10 dark:bg-secondary/10 rounded-xl flex items-center justify-center text-primary dark:text-secondary mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
                To become the most trusted accommodation partner for every
                defense aspirant and student in India, ensuring they can focus
                solely on their performance.
              </p>
            </div>
            <div className="bg-secondary-light/20 dark:bg-gray-900 p-8 rounded-xl border border-secondary/10 dark:border-gray-800 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/10 dark:bg-secondary/10 rounded-xl flex items-center justify-center text-primary dark:text-secondary mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
                Our Values
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
                Hygiene, Safety, and Affordability. We treat every guest with
                the discipline and respect they deserve as future leaders of the
                nation.
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-8 md:p-12 shadow-sm transition-all duration-300">
            <h2 className="text-3xl font-semibold text-black dark:text-secondary mb-8 transition-colors duration-300">
              Specialized for SSB Aspirants
            </h2>
            <div className="prose prose-lg text-gray-600 dark:text-gray-400 max-w-none font-medium space-y-4 transition-colors duration-300">
              <p>
                We understand that the Service Selection Board (SSB) process is
                intense and demanding. Candidates often travel long distances
                and need a quiet, clean, and disciplined environment to rest and
                prepare.
              </p>
              <p>
                Shaurya SSB Stay was founded with the singular goal of
                supporting these aspirants. Located strategically near major SSB
                centers and national exam hubs, we provide more than just a bed;
                we provide a peaceful environment that helps you stay focused on
                your goals.
              </p>
              <p>
                Whether you need a one-night stay before your reporting time or
                a comfortable cabin for focused study, we have designed our
                facilities to cater specifically to your needs as a student and
                a candidate.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

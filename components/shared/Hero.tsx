import Link from "next/link";
import Image from "next/image";
import { Bed, Wifi, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-20 lg:pb-10 overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl lg:text-6xl font-heading font-medium leading-tight mb-6 text-black dark:text-white">
              Affordable{" "}
              <span className="text-primary dark:text-secondary">
                One-Night Stay
              </span>{" "}
              for Students & Interview Candidates
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
              Clean • Safe • Budget Friendly. Comfortable and hygienic
              accommodation with essential facilities, specially designed for
              students traveling for exams and interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-primary-dark transition shadow-lg shadow-teal-100 dark:shadow-teal-900/10"
              >
                Book Your Stay
              </Link>
              <Link
                href="#rooms"
                className="border-2 border-secondary text-primary dark:text-secondary px-8 py-4 rounded-xl font-semibold text-center hover:bg-secondary-light dark:hover:bg-secondary/10 transition"
              >
                View Rooms
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-primary dark:text-secondary font-medium">
                <Bed className="h-5 w-5" /> Clean Bed
              </span>
              <span className="flex items-center gap-2 text-primary dark:text-secondary font-medium">
                <Wifi className="h-5 w-5" /> Free Wi-Fi
              </span>
              <span className="flex items-center gap-2 text-primary dark:text-secondary font-medium">
                <ShieldCheck className="h-5 w-5" /> Safe Environment
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-[500px] lg:h-[590px] bg-secondary-light dark:bg-gray-900 rounded-xl overflow-hidden relative border-2 border-secondary/20 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent dark:from-primary/20" />
              <div className="flex items-center justify-center h-full">
                <Image
                  src="/homePageImges/mainbuilding.jpg"
                  alt="Shaurya SSB Stay Building"
                  width={800}
                  height={600}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border-l-4 border-secondary hidden sm:block transition-colors duration-300">
              <p className="text-2xl font-bold text-primary dark:text-secondary">
                Starting from ₹349
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Best price guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import Link from "next/link";
import Image from "next/image";
import { Bed, Wifi, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-26 sm:pt-24 pb-12 sm:pb-20 lg:pb-10 overflow-hidden bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 items-center">
          {/* 1. Header & Text - Top on all screens */}
          <div className="max-w-xl text-center lg:text-left order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-heading font-semibold leading-tight mb-4 sm:mb-6 text-black dark:text-white">
              Affordable{" "}
              <span className="text-primary dark:text-secondary">
                One-Night Stay
              </span>{" "}
              for Students & Interview Candidates
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed font-medium px-2 sm:px-0">
              Clean • Safe • Budget Friendly. Comfortable and hygienic
              accommodation with essential facilities, specially designed for
              students traveling for exams and interviews.
            </p>
          </div>

          {/* 2. Image Section - Below Text on mobile, Side by Side on Desktop */}
          <div className="relative mt-8 lg:mt-0 order-2 lg:row-span-2">
            <div className="w-full h-[320px] sm:h-[450px] lg:h-[590px] bg-secondary-light dark:bg-gray-900 rounded-xl overflow-hidden relative border-2 border-secondary/20 shadow-2xl transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent dark:from-primary/20 z-10" />
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
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-xl border-l-4 border-secondary transition-colors duration-300 z-20">
              <p className="text-xl sm:text-2xl font-semibold text-primary dark:text-secondary">
                Starting from ₹349
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                Best price guaranteed
              </p>
            </div>
          </div>

          {/* 3. CTA Buttons & Features - Below Image on mobile, Below Text on Desktop */}
          <div className="mt-8 sm:mt-10 order-3 lg:order-3">
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <Link
                href="#booking-form"
                className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-primary-dark transition shadow-lg shadow-teal-100 dark:shadow-teal-900/10 active:scale-95"
              >
                Book Your Stay
              </Link>
              <Link
                href="#rooms"
                className="border-2 border-secondary text-primary dark:text-secondary px-8 py-4 rounded-xl font-semibold text-center hover:bg-secondary-light dark:hover:bg-secondary/10 transition active:scale-95"
              >
                View Rooms
              </Link>
            </div>
            <div className="mt-8 sm:mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <span className="flex items-center gap-2 text-primary dark:text-secondary font-semibold">
                <Bed className="h-4 w-4 sm:h-5 sm:h-5" /> Clean Bed
              </span>
              <span className="flex items-center gap-2 text-primary dark:text-secondary font-semibold">
                <Wifi className="h-4 w-4 sm:h-5 sm:h-5" /> Free Wi-Fi
              </span>
              <span className="flex items-center gap-2 text-primary dark:text-secondary font-semibold">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:h-5" /> Safe
                Environment
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

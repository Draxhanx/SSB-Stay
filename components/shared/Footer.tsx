import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black pt-20 pb-10 text-gray-400 border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-border pb-16 mb-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Shaurya SSB Stay Logo"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-heading font-semibold text-white tracking-tight">
                Shaurya <span className="text-secondary">SSB Stay</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs transition-colors duration-300">
              Providing affordable, safe, and clean one-night stays for students
              and defence aspirants. Your mission, our support.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 dark:bg-gray-900 flex items-center justify-center text-white hover:bg-secondary hover:text-primary-dark transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 dark:bg-gray-900 flex items-center justify-center text-white hover:bg-secondary hover:text-primary-dark transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 dark:bg-gray-900 flex items-center justify-center text-white hover:bg-secondary hover:text-primary-dark transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white dark:text-secondary font-semibold text-lg mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="hover:text-secondary transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#rooms"
                  className="hover:text-secondary transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
                  Rooms & Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/#facilities"
                  className="hover:text-secondary transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-secondary transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white dark:text-secondary font-semibold text-lg mb-6 uppercase tracking-wider">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-secondary shrink-0 mt-1" />
                <span>
                  11, Geeta Bhawan, Ramanand Nagar, Lalghati, Bhopal 462030
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-secondary shrink-0" />
                <a
                  href="tel:+916261445072"
                  className="hover:text-white transition-colors duration-300"
                >
                  +91 6261 445072
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-secondary shrink-0" />
                <a
                  href="mailto:shauryassbstay@gmail.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  shauryassbstay@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white dark:text-secondary font-semibold text-lg mb-6 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-secondary transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-secondary transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors pt-4 block"
                >
                  Admin Secure Access
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border">
          <p className="text-sm font-medium transition-colors duration-300">
            © {new Date().getFullYear()}{" "}
            <span className="text-white">Shaurya SSB Stay</span>. Designed with
            ❤️ for aspirants.
          </p>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-semibold">
            <span className="text-gray-600 dark:text-gray-700 transition-colors duration-300">
              Secure Stay
            </span>
            <span className="text-gray-600 dark:text-gray-700 transition-colors duration-300">
              Student First
            </span>
            <span className="text-gray-600 dark:text-gray-700 transition-colors duration-300">
              Clean Space
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

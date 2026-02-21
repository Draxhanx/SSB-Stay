"use client";

import { useState, useEffect } from "react";
import { Send, Phone, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    roomType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSelectRoom = (e: any) => {
      setFormData((prev) => ({ ...prev, roomType: e.detail.roomType }));
      const element = document.getElementById("booking-form");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("selectRoom" as any, handleSelectRoom);
    return () =>
      window.removeEventListener("selectRoom" as any, handleSelectRoom);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: `+91 ${formData.phone}`,
        }),
      });

      if (res.ok) {
        toast.success("Enquiry sent! We will contact you shortly.");
        setFormData({ name: "", phone: "", roomType: "", message: "" });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Failed to send enquiry");
      }
    } catch (error) {
      toast.error(
        "Something went wrong. Please try again or call us directly.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-primary dark:bg-background text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-4xl font-heading font-semibold mb-6 text-white dark:text-secondary">
              Quick Booking & Enquiry
            </h2>
            <p className="text-teal-50 dark:text-gray-400 mb-8 text-lg opacity-90 leading-relaxed font-medium transition-colors duration-300">
              Traveling for an exam or interview? Don't worry about
              accommodation. Fill the form or contact us directly on WhatsApp
              for an instant response.
            </p>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/916261445072"
                  target="_blank"
                  className="flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition shadow-lg shadow-black/10"
                >
                  WhatsApp Us
                </a>
                <a
                  href="tel:+916261445072"
                  className="flex items-center gap-2 bg-secondary text-primary-dark px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition shadow-lg shadow-black/10"
                >
                  <Phone className="h-5 w-5" /> Call Now
                </a>
              </div>
            </div>
          </div>
          <div
            id="booking-form"
            className="bg-card p-8 rounded-xl text-foreground shadow-2xl relative overflow-hidden border border-border transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-light/30 dark:bg-secondary/5 rounded-bl-full -mr-10 -mt-10 transition-colors duration-300" />
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  className="w-full px-4 py-3 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none text-gray-500 font-semibold border-r border-border pr-2">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    className="w-full pl-24 pr-4 py-3 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent outline-none transition"
                    placeholder="00000 00000"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric
                      if (value.length <= 10) {
                        setFormData({ ...formData, phone: value });
                      }
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-1">
                  Room Preference
                </label>
                <select
                  className="w-full px-4 py-3 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent outline-none transition"
                  value={formData.roomType}
                  onChange={(e) =>
                    setFormData({ ...formData, roomType: e.target.value })
                  }
                  required
                >
                  <option value="">Select a room type</option>
                  <option value="Shared Dormitory">
                    Shared Dormitory (₹349)
                  </option>
                  <option value="Personal Cabin">Personal Cabin (₹349)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-1">
                  Special Message (Optional)
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-transparent outline-none h-24 resize-none transition"
                  placeholder="Any specific requests?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary text-primary-dark py-4 rounded-xl font-semibold text-lg hover:bg-orange-400 dark:hover:bg-white transition flex items-center justify-center gap-2 shadow-lg shadow-secondary/10 disabled:opacity-50"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-5 w-5" /> Send Enquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Phone,
  User,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  Filter,
  Bed,
} from "lucide-react";

interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  roomType: string;
  message: string;
  status: string;
  createdAt: string;
}

const BookingsPage = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      setEnquiries(data);
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status } : e)),
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredEnquiries =
    filter === "all"
      ? enquiries
      : enquiries.filter(
          (e) => e.status.toLowerCase() === filter.toLowerCase(),
        );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black text-primary-dark">
            Bookings & Enquiries
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">
            Manage your one-night stay requests
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-secondary/10 shadow-sm">
          <Filter size={16} className="text-gray-400 ml-2" />
          <select
            className="bg-transparent border-none outline-none font-bold text-sm text-gray-700 pr-4"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Enquiries</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredEnquiries.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-gray-100">
            <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
              No enquiries found
            </p>
          </div>
        ) : (
          filteredEnquiries.map((enquiry) => (
            <div
              key={enquiry._id}
              className="bg-white rounded-[2rem] border border-secondary/10 p-6 md:p-8 shadow-sm hover:shadow-md transition group relative overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 w-2 h-full ${
                  enquiry.status === "Confirmed"
                    ? "bg-green-500"
                    : enquiry.status === "Cancelled"
                      ? "bg-red-500"
                      : "bg-secondary"
                }`}
              />

              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-dark uppercase tracking-tight">
                        {enquiry.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1.5 text-sm text-gray-500 font-bold">
                          <Phone size={14} className="text-secondary" />{" "}
                          {enquiry.phone}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-gray-500 font-bold">
                          <Calendar size={14} className="text-secondary" />{" "}
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50/50 p-4 rounded-2xl border border-secondary/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Bed size={16} className="text-primary" />
                      <span className="text-xs font-black uppercase text-primary tracking-widest">
                        Preference: {enquiry.roomType}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed italic">
                      "{enquiry.message || "No special requests."}"
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-end gap-4 min-w-[200px]">
                  <div
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                      enquiry.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : enquiry.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-secondary-light text-primary-dark shadow-sm shadow-secondary/20"
                    }`}
                  >
                    {enquiry.status}
                  </div>

                  <div className="flex gap-2">
                    {enquiry.status === "Pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(enquiry._id, "Confirmed")}
                          className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2.5 rounded-xl font-bold text-sm transition"
                        >
                          <CheckCircle2 size={16} /> Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(enquiry._id, "Cancelled")}
                          className="flex items-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-xl font-bold text-sm transition"
                        >
                          <XCircle size={16} /> Cancel
                        </button>
                      </>
                    )}
                    {enquiry.status !== "Pending" && (
                      <button
                        onClick={() => updateStatus(enquiry._id, "Pending")}
                        className="text-gray-400 hover:text-primary p-2 transition"
                        title="Move to Pending"
                      >
                        <Clock size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingsPage;

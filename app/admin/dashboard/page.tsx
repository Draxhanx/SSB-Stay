import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Bed, Users, MessageSquare, IndianRupee } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  const stats = [
    {
      name: "Total Rooms",
      value: "10",
      icon: <Bed className="h-6 w-6" />,
      color: "bg-primary",
    },
    {
      name: "Total Enquiries",
      value: "24",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "bg-teal-600",
    },
    {
      name: "Bookings Today",
      value: "5",
      icon: <Users className="h-6 w-6" />,
      color: "bg-secondary",
    },
    {
      name: "Revenue (Est)",
      value: "₹2500",
      icon: <IndianRupee className="h-6 w-6" />,
      color: "bg-primary-dark",
    },
  ];

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-heading font-bold text-primary-dark">
          Admin Dashboard
        </h1>
        <div className="flex gap-4">
          <Link
            href="/admin/rooms"
            className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition shadow-md shadow-teal-900/10"
          >
            Manage Rooms
          </Link>
          <Link
            href="/admin/bookings"
            className="bg-white text-primary px-6 py-2 rounded-lg font-bold border border-primary/20 hover:bg-secondary-light transition"
          >
            View Bookings
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/10 hover:shadow-md transition"
          >
            <div
              className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-black/5`}
            >
              {stat.icon}
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
              {stat.name}
            </p>
            <p className="text-2xl font-black mt-1 text-primary-dark">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold mb-6">Recent Enquiries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-400 text-sm uppercase">
                <th className="pb-4 font-medium">Name</th>
                <th className="pb-4 font-medium">Room Type</th>
                <th className="pb-4 font-medium">Phone</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-gray-50">
                <td className="py-4 font-medium">Rahul Sharma</td>
                <td className="py-4 text-gray-600">Shared Dorm</td>
                <td className="py-4 text-gray-600">+91 98765 43210</td>
                <td className="py-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                    Pending
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-blue-600 font-medium text-sm">
                    View Details
                  </button>
                </td>
              </tr>
              {/* More rows... */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

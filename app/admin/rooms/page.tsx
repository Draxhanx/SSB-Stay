import { Bed, Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

export default function AdminRooms() {
  const rooms = [
    {
      id: 1,
      name: "Shared Dorm A",
      type: "Shared",
      price: 499,
      available: true,
    },
    {
      id: 2,
      name: "Private Single 101",
      type: "Private",
      price: 1200,
      available: false,
    },
  ];

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-dark">
            Manage Rooms
          </h1>
          <p className="text-gray-500 font-medium">
            Update availability and pricing for rooms.
          </p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-primary-dark transition shadow-lg shadow-teal-900/10">
          <Plus size={20} /> Add New Room
        </button>
      </div>

      <div className="grid gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white p-8 rounded-xl shadow-sm border border-secondary/10 flex items-center justify-between hover:shadow-md transition group"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-secondary-light/30 rounded-xl flex items-center justify-center text-primary font-semibold text-xl shadow-inner border border-secondary/5">
                {room.type === "Shared" ? "SM" : "PR"}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-primary-dark">
                  {room.name}
                </h3>
                <p className="text-gray-500 font-semibold mt-1">
                  <span className="text-secondary">{room.type}</span> Room •{" "}
                  <span className="text-primary font-semibold tracking-tight">
                    ₹{room.price}
                  </span>
                  /night
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition ${room.available ? "text-primary border-primary/20 bg-teal-50 hover:bg-primary hover:text-white" : "text-red-500 border-red-100 bg-red-50 hover:bg-red-500 hover:text-white"}`}
              >
                {room.available ? <Eye size={18} /> : <EyeOff size={18} />}
                {room.available ? "Available" : "Full"}
              </button>
              <button className="p-4 text-gray-400 hover:text-primary hover:bg-secondary-light rounded-xl transition border border-transparent hover:border-secondary/20 bg-gray-50 sm:bg-transparent">
                <Edit2 size={24} />
              </button>
              <button className="p-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition border border-transparent hover:border-red-100 bg-gray-50 sm:bg-transparent">
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import {
  Check,
  Video,
  Image as ImageIcon,
  Waves,
  ShieldCheck,
  Heart,
} from "lucide-react";

const Rooms = () => {
  const roomOptions = [
    {
      id: "dorm",
      name: "Shared Dormitory",
      type: "Student Favourite",
      price: "₹349",
      description:
        "Our spacious shared dormitory is designed specifically for students and candidates. Clean, secure, and conveniently located, it offers the perfect environment for a quick rest before your big day.",
      features: [
        "Individual Single Bed with clean linen",
        "Common Clean Bathroom Facility",
        "24/7 Pure RO Drinking Water",
        "High-Speed Wi-Fi for last-minute prep",
        "Secure Locker for your belongings",
      ],
      media: {
        type: "video",
        src: "/homePageImges/introvideo.mp4",
        badge: "Virtual Tour",
        icon: <Video size={16} className="text-secondary" />,
      },
      gallery: [
        { src: "/homePageImges/beds.jpg", alt: "Dormitory Beds" },
        { src: "/homePageImges/beds2.jpg", alt: "Dormitory View" },
      ],
    },
    {
      id: "cabin",
      name: "Personal Cabin",
      type: "Girls & Families Special",
      price: "₹349",
      description:
        "A secure and private space dedicated to female candidates and families. These cabins offer extra privacy, additional storage, and a quieter environment for focused preparation and peaceful rest.",
      features: [
        "Private Cabin Space for extra privacy",
        "Exclusive access for Girls & Families",
        "Premium bedding and study lamp",
        "Priority Clean Bathroom access",
        "Extra storage space for luggage",
      ],
      media: {
        type: "image",
        src: "/homePageImges/mainbuilding.jpg",
        badge: "Safe & Secure",
        icon: <ShieldCheck size={16} className="text-secondary" />,
      },
      gallery: [
        { src: "/homePageImges/roomsgate.jpg", alt: "Cabin View" },
        { src: "/homePageImges/bathroom.jpg", alt: "Premium Bathroom" },
      ],
    },
  ];

  return (
    <section
      id="rooms"
      className="py-10 bg-background relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="text-secondary font-semibold text-sm uppercase tracking-[0.3em] mb-4 block">
            Accommodation
          </span>
          <h2 className="text-4xl md:text-4xl font-heading mb-6 text-black dark:text-white font-semibold tracking-tight">
            Our Stay Options
          </h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-xl" />
        </div>

        <div className="space-y-10">
          {roomOptions.map((room, index) => (
            <div
              key={room.id}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Media Section */}
              <div
                className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
              >
                <div className="relative rounded-xl md:rounded-xl overflow-hidden shadow-2xl border-4 border-border aspect-video bg-black group shrink-0 transition-all duration-300">
                  {room.media.type === "video" ? (
                    <video
                      src={room.media.src}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition duration-500"
                    />
                  ) : (
                    <Image
                      src={room.media.src}
                      alt={room.name}
                      fill
                      className="object-cover transition duration-1000 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute top-6 left-6 bg-primary/90 dark:bg-primary/95 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold backdrop-blur-md border border-white/20">
                    {room.media.icon} {room.media.badge}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {room.gallery.map((img, i) => (
                    <div
                      key={i}
                      className={`relative rounded-xl md:rounded-xl overflow-hidden shadow-lg border-2 border-border aspect-square transition-all duration-300 ${i === 2 ? "col-span-2 aspect-[16/7]" : ""}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition duration-700 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm flex items-center justify-between transition-colors duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary-light/30 dark:bg-secondary/10 rounded-xl flex items-center justify-center text-primary dark:text-secondary shrink-0 transition-colors duration-300">
                      {room.id === "dorm" ? (
                        <Waves size={24} />
                      ) : (
                        <Heart size={24} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-dark dark:text-white leading-tight">
                        {room.id === "dorm"
                          ? "Daily Maintenance"
                          : "Family Environment"}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">
                        {room.id === "dorm"
                          ? "Hygiene is our top priority"
                          : "Privacy & Safety Guaranteed"}
                      </p>
                    </div>
                  </div>
                  <ImageIcon
                    size={24}
                    className="text-secondary/20 hidden sm:block"
                  />
                </div>
              </div>

              {/* Details Section */}
              <div
                className={`${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className="bg-card p-8 md:p-12 rounded-xl md:rounded-xl shadow-xl border border-border relative transition-colors duration-300">
                  <div
                    className={`absolute -top-4 ${index % 2 === 1 ? "lg:-left-4" : "lg:-right-4"} bg-secondary text-primary-dark px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-widest shadow-xl z-20`}
                  >
                    {room.type}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold text-primary-dark dark:text-secondary mb-4 leading-tight">
                    {room.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 leading-relaxed text-base md:text-lg italic border-l-4 border-secondary/20 pl-5 transition-colors duration-300">
                    {room.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {room.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 group">
                        <div className="w-6 h-6 rounded-md bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-secondary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                          <Check size={14} className="stroke-[4px]" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm md:text-base transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-border">
                    <div className="text-center sm:text-left">
                      <div className="flex items-baseline justify-center sm:justify-start gap-1">
                        <span className="text-4xl font-semibold text-primary-dark dark:text-secondary">
                          {room.price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest text-[10px]">
                          / Night
                        </span>
                      </div>
                      <p className="text-secondary font-semibold text-[10px] uppercase tracking-tighter mt-1">
                        Inclusive of all taxes
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent("selectRoom", {
                            detail: { roomType: room.name },
                          }),
                        );
                      }}
                      className="w-full sm:w-auto bg-primary dark:bg-secondary text-white dark:text-primary-dark px-10 py-5 rounded-xl font-semibold cursor-pointer text-base hover:bg-primary-dark dark:hover:bg-white transition shadow-2xl shadow-teal-900/20 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                    >
                      Secure My Stay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;

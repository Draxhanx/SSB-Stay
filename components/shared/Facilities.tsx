import { Bed, Wifi, Droplets, Shield, Clock } from "lucide-react";

const facilities = [
  {
    name: "Clean & Comfortable Bed",
    icon: <Bed className="h-8 w-8 text-primary" />,
    description: "Hygienic sheets and pillows for a refreshing sleep.",
  },
  {
    name: "Free Wi-Fi",
    icon: <Wifi className="h-8 w-8 text-primary" />,
    description: "High-speed internet for exam prep and job searches.",
  },
  {
    name: "RO Drinking Water",
    icon: <Droplets className="h-8 w-8 text-primary" />,
    description: "Pure and safe drinking water available 24/7.",
  },
  {
    name: "Late-Night Bathroom Access",
    icon: <Clock className="h-8 w-8 text-primary" />,
    description: "Accessible facilities regardless of your arrival time.",
  },
  {
    name: "Safe Environment",
    icon: <Shield className="h-8 w-8 text-primary" />,
    description: "CCTV monitored and secure premises for peace of mind.",
  },
];

const Facilities = () => {
  return (
    <section
      id="facilities"
      className="pb-10 pt-5 bg-background transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-semibold mb-4 text-black dark:text-white">
            Our Facilities
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            We provide everything you need for a comfortable one-night stay, so
            you can focus on your exam or interview.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center sm:text-left">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:border-primary/20 hover:shadow-md transition duration-300"
            >
              <div className="mb-4 flex justify-center sm:justify-start">
                <div className="p-3 bg-secondary-light/20 dark:bg-gray-900 rounded-xl transition-colors duration-300">
                  {facility.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary-dark dark:text-secondary">
                {facility.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;

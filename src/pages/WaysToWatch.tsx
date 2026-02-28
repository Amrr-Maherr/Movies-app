import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Tv, Smartphone, Tablet, Laptop, Gamepad2 } from "lucide-react";

export default function WaysToWatch() {
  const devices = [
    {
      icon: <Tv className="w-12 h-12" />,
      title: "Smart TV",
      description: "Watch on your favorite smart TV. Available on Samsung, LG, Sony, and more."
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile Devices",
      description: "Download the Netflix app for iOS and Android. Watch on the go."
    },
    {
      icon: <Tablet className="w-12 h-12" />,
      title: "Tablets",
      description: "Perfect for travel. Download shows and watch offline on your tablet."
    },
    {
      icon: <Laptop className="w-12 h-12" />,
      title: "Laptops & PCs",
      description: "Stream directly from netflix.com on any web browser."
    },
    {
      icon: <Gamepad2 className="w-12 h-12" />,
      title: "Gaming Consoles",
      description: "PlayStation, Xbox, and Nintendo Switch. Entertainment meets gaming."
    }
  ];

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-12">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Ways to Watch
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Watch Netflix on your favorite devices, anytime, anywhere
        </p>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[var(--netflix-red)] to-[var(--netflix-red-dark)] rounded-md p-8 mb-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Unlimited entertainment on any screen
          </h2>
          <p className="text-white/90 mb-6">
            From your TV to your phone, Netflix is available on thousands of devices. 
            Start watching on one device and continue on another.
          </p>
          <button className="bg-white text-[var(--netflix-red)] px-8 py-3 rounded font-bold hover:bg-white/90 transition-colors duration-300">
            Browse All Devices
          </button>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8 hover:border-[var(--netflix-red)] transition-colors duration-300 group"
            >
              <div className="text-[var(--netflix-red)] mb-6 group-hover:scale-110 transition-transform duration-300">
                {device.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{device.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {device.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Chromecast Ready</h3>
            <p className="text-[var(--text-secondary)]">
              Cast your favorite shows from your phone or tablet to your TV with Chromecast. 
              Available on most Android and iOS devices.
            </p>
          </div>
          <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">VR Compatible</h3>
            <p className="text-[var(--text-secondary)]">
              Experience Netflix in virtual reality. Watch on a giant virtual screen 
              with compatible VR headsets.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
